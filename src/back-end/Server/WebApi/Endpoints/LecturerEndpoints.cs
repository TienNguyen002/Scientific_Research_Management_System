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
                .Produces<ApiResponse<LecturerItem>>();

            routeGroupBuilder.MapGet("/byslug/{slug:regex(^[a-z0-9_-]+$)}", GetLecturerBySlug)
                .WithName("GetLecturerBySlug")
                .Produces<ApiResponse<LecturerItem>>();

            routeGroupBuilder.MapPost("/", CreateAccount)
                .WithName("CreateAccount")
                .AddEndpointFilter<ValidatorFilter<LecturerCreateAccount>>()
                .Produces<ApiResponse<LecturerAccount>>();

            routeGroupBuilder.MapPut("/{slug:regex(^[a-z0-9_-]+$)}", ChangeInformation)
                .WithName("ChangeInformation")
                .AddEndpointFilter<ValidatorFilter<LecturerEditModel>>()
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
            var lecturer = await lecturerRepository.GetLecturerByIdAsync(id);
            return lecturer == null
                ? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy giảng viên có mã số {id}"))
                : Results.Ok(ApiResponse.Success(mapper.Map<LecturerItem>(lecturer)));
        }

        private static async Task<IResult> GetLecturerBySlug(
            string slug,
            ILecturerRepository lecturerRepository,
            IMapper mapper)
        {
            var lecturer = await lecturerRepository.GetLecturerBySlugAsync(slug);
            return lecturer == null
                ? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy giảng viên có Slug {slug}"))
                : Results.Ok(ApiResponse.Success(mapper.Map<LecturerItem>(lecturer)));
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
            LecturerEditModel model,
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
            return await lecturerRepository.ChangeInformationAsync(lecturer)
               ? Results.Ok(ApiResponse.Success($"Thay đổi giảng viên có slug = {slug} thành công"))
               : Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy giảng viên có có slug = {slug}"));
        }
    } 
}
