using Carter;
using Core.Collections;
using Core.DTO.Lecturer;
using Core.Entities;
using Mapster;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc.Rendering;
using Services.Apps.Departments;
using Services.Apps.Lecturers;
using Services.Media;
using System.Net;
using WebApi.Models;
using WebApi.Models.Account;
using WebApi.Models.Lecturer;
using SlugGenerator;

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

            routeGroupBuilder.MapDelete("/{id:int}", DeleteLecturer)
                .WithName("DeleteLecturer")
                .Produces<ApiResponse<string>>();

            routeGroupBuilder.MapGet("/get-filter", GetFilter)
                .WithName("GetLecturerFilter")
                .Produces<ApiResponse<LecturerFilterModel>>();

            routeGroupBuilder.MapPost("/", ChangeInformation)
                .WithName("ChangeLecturerInformation")
                .Accepts<LecturerEditModel>("multipart/form-data")
                .Produces(401)
                .Produces<ApiResponse<LecturerItem>>();

            routeGroupBuilder.MapPost("/add", AddLecturer)
                .WithName("AddLecturer")
                .Accepts<LecturerAddModel>("multipart/form-data")
                .Produces(401)
                .Produces<ApiResponse<LecturerItem>>();

            routeGroupBuilder.MapPost("/change-password", ChangePassword)
                .WithName("ChangeLecturerPassword")
                .Accepts<ResetPasswordRequest>("multipart/form-data")
                .Produces(401)
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
        
        private static async Task<IResult> ChangeInformation(
            HttpContext context,
            IMapper mapper,
            ILecturerRepository lecturerRepository,
            IMediaManager mediaManager)
        {
            var model = await LecturerEditModel.BindAsync(context);
            var lecturer = !string.IsNullOrWhiteSpace(model.UrlSlug) ? await lecturerRepository.GetLecturerBySlugAsync(model.UrlSlug) : null;
            if (lecturer == null)
            {
                lecturer = new Lecturer()
                {

                };
            }
            lecturer.FullName = model.FullName;
            lecturer.Email = model.Email;
            lecturer.Qualification = model.Qualification;
            lecturer.DoB = model.DoB;
            lecturer.DepartmentId = model.DepartmentId;
            lecturer.UrlSlug = model.FullName.GenerateSlug();
            if (model.ImageFile?.Length > 0)
            {
                string hostname = $"{context.Request.Scheme}://{context.Request.Host}{context.Request.PathBase}/",
                    uploadPath = await mediaManager.SaveImgFileAsync(model.ImageFile.OpenReadStream(),
                                                                     model.ImageFile.FileName,
                                                                     model.ImageFile.ContentType);
                if (!string.IsNullOrWhiteSpace(uploadPath))
                {
                    lecturer.ImageUrl = uploadPath;
                }
            }
            await lecturerRepository.AddOrUpdateLecturerAsync(lecturer);
            return Results.Ok(ApiResponse.Success(mapper.Map<LecturerDto>(lecturer), HttpStatusCode.Created));
        }

        private static async Task<IResult> AddLecturer(
            HttpContext context,
            IMapper mapper,
            ILecturerRepository lecturerRepository)
        {
            var model = await LecturerAddModel.BindAsync(context);
            var lecturer = new Lecturer()
            {
                FullName = model.FullName,
                Email = model.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(model.Password),
                DepartmentId = model.DepartmentId,
            };
            await lecturerRepository.AddOrUpdateLecturerAsync(lecturer);
            return Results.Ok(ApiResponse.Success(mapper.Map<LecturerDto>(lecturer), HttpStatusCode.Created));
        }

        private static async Task<IResult> ChangePassword(
            HttpContext context,
            IMapper mapper,
            ILecturerRepository lecturerRepository)
        {
            var model = await ResetPasswordRequest.BindAsync(context);
            var lecturer = !string.IsNullOrWhiteSpace(model.UrlSlug) ? await lecturerRepository.GetLecturerBySlugAsync(model.UrlSlug) : null;
            if (!BCrypt.Net.BCrypt.Verify(model.Password, lecturer.Password))
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.Conflict, $"Sai mật khẩu"));
            }
            if (model.NewPassword == model.Password)
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.Conflict, $"Vui lòng nhập mật khẩu mới khác với mật khẩu cũ"));
            }
            if (model.ConfirmPassword != model.NewPassword)
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.Conflict, $"Mật khẩu xác nhận không trùng khớp"));
            }
            lecturer.Password = BCrypt.Net.BCrypt.HashPassword(model.NewPassword);
            await lecturerRepository.UpdateLecturerAsync(lecturer);
            return Results.Ok(ApiResponse.Success(mapper.Map<LecturerDto>(lecturer), HttpStatusCode.Created));
        }
    } 
}
