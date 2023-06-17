using Carter;
using Core.Collections;
using Core.DTO.Lecturer;
using Core.DTO.Others;
using Core.Entities;
using Mapster;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc.Rendering;
using Services.Apps.Departments;
using Services.Apps.Lecturers;
using Services.Apps.Students;
using Services.Media;
using System.Net;
using WebApi.Filters;
using WebApi.Models;
using WebApi.Models.Account;
using WebApi.Models.Lecturer;
using WebApi.Models.Student;

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

            routeGroupBuilder.MapPost("/create", CreateAccount)
                .WithName("CreateAccount")
                .AddEndpointFilter<ValidatorFilter<RegisterRequest>>()
                .Produces<ApiResponse<AccountDto>>();

            routeGroupBuilder.MapPut("/{slug:regex(^[a-z0-9_-]+$)}/information", ChangeInformation)
                .WithName("ChangeInformation")
                .AddEndpointFilter<ValidatorFilter<LecturerEditModel>>()
                .Produces<ApiResponse<string>>();

            routeGroupBuilder.MapPut("/{slug:regex(^[a-z0-9_-]+$)}/change-password", ChangePassword)
                .WithName("ChangePassword")
                .AddEndpointFilter<ValidatorFilter<PasswordRequest>>()
                .Produces<ApiResponse<string>>();

            routeGroupBuilder.MapDelete("/{id:int}", DeleteLecturer)
                .WithName("DeleteLecturer")
                .Produces<ApiResponse<string>>();

            routeGroupBuilder.MapGet("/get-filter", GetFilter)
                .WithName("GetLecturerFilter")
                .Produces<ApiResponse<LecturerFilterModel>>();

            routeGroupBuilder.MapPost("/image/{slug:regex(^[a-z0-9_-]+$)}", SetImage)
              .WithName("SetLecturerImage")
              .Accepts<IFormFile>("multipart/form-data")
              .Produces<ApiResponse<string>>();

            routeGroupBuilder.MapPost("/", AddLecturer)
                .WithName("AddLecturer")
                .Accepts<LecturerAddModel>("multipart/form-data")
                .Produces(401)
                .Produces<ApiResponse<LecturerItem>>();

            routeGroupBuilder.MapPost("/update", UpdateLecturer)
                .WithName("UpdateLecturer")
                .Accepts<LecturerEditModel>("multipart/form-data")
                .Produces(401)
                .Produces<ApiResponse<LecturerItem>>();
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
            RegisterRequest model,
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
            return Results.Ok(ApiResponse.Success(mapper.Map<AccountDto>(lecturer), HttpStatusCode.Created));
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
            PasswordRequest model,
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

        private static async Task<IResult> GetFilter(
            IDepartmentRepository departmentRepository)
        {
            var model = new LecturerFilterModel()
            {
                DepartmentList = (await departmentRepository.GetAllDepartmentAsync())
                .Select(d => new SelectListItem()
                {
                    Text = d.Name,
                    Value = d.Id.ToString(),
                })
            };
            return Results.Ok(ApiResponse.Success(model));
        }

        private static async Task<IResult> SetImage(
            string slug,
            IFormFile imageFile,
            ILecturerRepository lecturerRepository,
            IMediaManager mediaManager)
        {
            var imageUrl = await mediaManager.SaveImgFileAsync(
                imageFile.OpenReadStream(),
                imageFile.FileName, imageFile.ContentType);
            if (string.IsNullOrWhiteSpace(imageUrl))
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, "Không lưu được tập tin"));
            }
            await lecturerRepository.SetImageAsync(slug, imageUrl);
            return Results.Ok(ApiResponse.Success(imageUrl));
        }

        private static async Task<IResult> AddLecturer(
            HttpContext context,
            IMapper mapper,
            ILecturerRepository lecturerRepository,
            IMediaManager mediaManager)
        {
            var model = await LecturerAddModel.BindAsync(context);
            var slug = model.FullName.GenerateSlug();
            if (await lecturerRepository.IsLecturerSlugExitedAsync(model.Id, slug))
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.Conflict, $"Slug '{slug}' đã được sử dụng"));
            }
            var lecturer = model.Id > 0 ? await lecturerRepository.GetLecturerByIdAsync(model.Id) : null;
            lecturer.FullName = model.FullName;
            lecturer.Email = model.Email;
            lecturer.Password = model.Password;
            lecturer.UrlSlug = model.FullName.GenerateSlug();
            
            await lecturerRepository.AddOrUpdateLecturerAsync(lecturer);
            return Results.Ok(ApiResponse.Success(mapper.Map<LecturerDto>(lecturer), HttpStatusCode.Created));
        }

        private static async Task<IResult> UpdateLecturer(
            HttpContext context,
            IMapper mapper,
            ILecturerRepository lecturerRepository,
            IMediaManager mediaManager)
        {
            var model = await LecturerEditModel.BindAsync(context);
            var slug = model.FullName.GenerateSlug();
            if (await lecturerRepository.IsLecturerSlugExitedAsync(model.Id, slug))
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.Conflict, $"Slug '{slug}' đã được sử dụng"));
            }
            var lecturer = model.Id > 0 ? await lecturerRepository.GetLecturerByIdAsync(model.Id) : null;
            lecturer.FullName = model.FullName;
            lecturer.Email = model.Email;
            lecturer.Password = model.Password;
            lecturer.Qualification = model.Qualification;
            lecturer.DoB = model.DoB;
            lecturer.DepartmentId = model.DepartmentId;
            lecturer.UrlSlug = model.FullName.GenerateSlug();
            
            await lecturerRepository.AddOrUpdateLecturerAsync(lecturer);
            return Results.Ok(ApiResponse.Success(mapper.Map<LecturerDto>(lecturer), HttpStatusCode.Created));
        }
    } 
}
