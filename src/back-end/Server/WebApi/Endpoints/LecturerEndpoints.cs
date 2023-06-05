using Carter;
using Core.Collections;
using Core.DTO.Lecturer;
using Core.DTO.Others;
using Core.Entities;
using Mapster;
using MapsterMapper;
using Services.Apps.Lecturers;
using System.Net;
using WebApi.Filters;
using WebApi.Models;
using WebApi.Models.Lecturer;
using WebApi.Models.Lecturer.Account;

namespace WebApi.Endpoints
{
    public class LecturerEndpoints : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            var routeGroupBuilder = app.MapGroup("/api/lecturers");

            routeGroupBuilder.MapGet("/", GetLecturer)
                .WithName("GetLecturer")
                .Produces<ApiResponse<LecturerItem>>();

            routeGroupBuilder.MapGet("/all", GetAllLecturers)
                .WithName("GetAllLecturers")
                .Produces<ApiResponse<PaginationResult<LecturerItem>>>();

            routeGroupBuilder.MapGet("/{id:int}", GetLecturerById)
                .WithName("GetLecturerById")
                .Produces<ApiResponse<LecturerDto>>();

            routeGroupBuilder.MapGet("/byslug/{slug:regex(^[a-z0-9_-]+$)}", GetLecturerBySlug)
                .WithName("GetLecturerBySlug")
                .Produces<ApiResponse<LecturerDto>>();

            routeGroupBuilder.MapPost("/", CreateAccount)
                .WithName("CreateAccount")
                .AddEndpointFilter<ValidatorFilter<LecturerCreateAccount>>()
                .Produces<ApiResponse<LecturerAccount>>();

            routeGroupBuilder.MapPut("/{slug:regex(^[a-z0-9_-]+$)}/information", ChangeInformation)
                .WithName("ChangeInformation")
                .AddEndpointFilter<ValidatorFilter<LecturerEditModel>>()
                .Produces<ApiResponse<string>>();

            routeGroupBuilder.MapPut("/{slug:regex(^[a-z0-9_-]+$)}/change-password", ChangePassword)
                .WithName("ChangePassword")
                .AddEndpointFilter<ValidatorFilter<LecturerPassword>>()
                .Produces<ApiResponse<string>>();

            routeGroupBuilder.MapDelete("/{id:int}", DeleteLecturer)
                .WithName("DeleteLecturer")
                .Produces<ApiResponse<string>>();
        }

        private static async Task<IResult> GetAllLecturers(
            ILecturerRepository lecturerRepository)
        {
            var lecturers = await lecturerRepository.GetLecturersAsync();
            return Results.Ok(ApiResponse.Success(lecturers));
        }

        private static async Task<IResult> GetLecturer(
            [AsParameters] LecturerFilterModel model,
            ILecturerRepository lecturerRepository,
            IMapper mapper)
        {
            var query = mapper.Map<LecturerQuery>(model);
            var lecturers = await lecturerRepository.GetPagedLecturesAsync<LecturerDto>(query, model,
                lecturers => lecturers.ProjectToType<LecturerDto>());
            var paginationResult = new PaginationResult<LecturerDto>(lecturers);
            return Results.Ok(ApiResponse.Success(paginationResult));
        }

        private static async Task<IResult> GetLecturerById(
            int id, 
            ILecturerRepository lecturerRepository,
            IMapper mapper)
        {
            var lecturer = await lecturerRepository.GetLecturerByIdAsync(id, true);
            return lecturer == null
                ? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy giảng viên có mã số {id}"))
                : Results.Ok(ApiResponse.Success(mapper.Map<LecturerDto>(lecturer)));
        }

        private static async Task<IResult> GetLecturerBySlug(
            string slug,
            ILecturerRepository lecturerRepository,
            IMapper mapper)
        {
            var lecturer = await lecturerRepository.GetLecturerBySlugAsync(slug, true);
            return lecturer == null
                ? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy giảng viên có Slug {slug}"))
                : Results.Ok(ApiResponse.Success(mapper.Map<LecturerDto>(lecturer)));
        }

        private static async Task<IResult> CreateAccount(
            LecturerCreateAccount model,
            ILecturerRepository lecturerRepository,
            IMapper mapper)
        {
            if(await lecturerRepository.IsLecturerEmailExitedAsync(0, model.Email))
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.Conflict, $"Email '{model.Email}' đã được sử dụng"));
            }
            if(model.ConfirmPassword != model.Password)
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.Conflict, $"Mật khẩu và mật khẩu xác nhận không trùng khớp"));
            }
            if(model == null)
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.Conflict, $"Không được bỏ trống"));
            }
            var lecturer = mapper.Map<Lecturer>(model);
            await lecturerRepository.CreateLecturerAccountAsync(lecturer);
            return Results.Ok(ApiResponse.Success(mapper.Map<LecturerAccount>(lecturer), HttpStatusCode.Created));
        }

        private static async Task<IResult> ChangeInformation(
            string slug,
            [AsParameters] LecturerEditModel model,
            IMapper mapper,
            ILecturerRepository lecturerRepository)
        {
            var lecturer = await lecturerRepository.GetLecturerBySlugAsync(slug);
            if(lecturer == null)
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound,
                    $"Không tìm thấy giảng viên có slug {slug}"));
            }
            mapper.Map(model, lecturer);
            return await lecturerRepository.UpdateLecturerAsync(lecturer)
               ? Results.Ok(ApiResponse.Success($"Thay đổi giảng viên có slug = {slug} thành công"))
               : Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy giảng viên có có slug = {slug}"));
        }

        private static async Task<IResult> ChangePassword(
            string slug,
            LecturerPassword model,
            IMapper mapper,
            ILecturerRepository lecturerRepository)
        {
            var lecturer = await lecturerRepository.GetLecturerBySlugAsync(slug);
            if (lecturer == null)
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound,
                    $"Không tìm thấy giảng viên có slug {slug}"));
            }
            if(await lecturerRepository.GetLecturerPasswordBySlugAsync(slug, model.Password))
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound,
                    $"Mật khẩu hiện tại không đúng"));
            }
            if(model.NewPassword == model.Password)
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound,
                    $"Mật khẩu mới không được trùng với mật khẩu cũ"));
            }
            if (model.ConfirmPassword != model.Password)
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound,
                    $"Mật khẩu xác nhận không trùng khớp"));
            }
            model.Password = model.NewPassword;
            mapper.Map(model, lecturer);
            return await lecturerRepository.UpdateLecturerAsync(lecturer)
               ? Results.Ok(ApiResponse.Success($"Đổi mật khẩu của giảng viên có slug {slug} thành công"))
               : Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy giảng viên có có slug = {slug}"));
        }

        private static async Task<IResult> DeleteLecturer(
            int id,
            ILecturerRepository lecturerRepository)
        {
            return await lecturerRepository.DeleteLecturerByIdAsync(id)
                ? Results.Ok(ApiResponse.Success("Xóa giảng viên thành công", HttpStatusCode.NoContent))
                : Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy giảng viên có id = {id}"));
        }
    } 
}
