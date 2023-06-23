using Carter;
using Core.Collections;
using Core.DTO.Lecturer;
using Core.DTO.Student;
using MapsterMapper;
using Services.Apps.Lecturers;
using Services.Apps.Students;
using WebApi.Models;
using WebApi.Models.Lecturer;
using WebApi.Models.Student;
using System.Net;
using Mapster;
using WebApi.Filters;
using Core.Entities;
using Services.Apps.Others;
using Services.Apps.Departments;
using Microsoft.AspNetCore.Mvc.Rendering;
using WebApi.Models.Account;
using Services.Apps.Topics;
using Services.Media;
using SlugGenerator;

namespace WebApi.Endpoints
{
    public class StudentEndpoints : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            var routeGroupBuilder = app.MapGroup("/api/students");

            routeGroupBuilder.MapGet("/", GetStudent)
                .WithName("GetStudent")
                .Produces<ApiResponse<StudentItem>>();

            routeGroupBuilder.MapDelete("/{id:int}", DeleteStudent)
                .WithName("DeleteStudent")
                .Produces<ApiResponse<string>>();

            routeGroupBuilder.MapGet("/all", GetAllStudent)
                .WithName("GetAllStudent")
                .Produces<ApiResponse<PaginationResult<StudentItem>>>();

            routeGroupBuilder.MapGet("/{id:int}", GetStudentById)
                .WithName("GetStudentById")
                .Produces<ApiResponse<StudentDto>>();

            routeGroupBuilder.MapGet("/byslug/{slug:regex(^[a-z0-9_-]+$)}", GetStudentBySlug)
                .WithName("GetStudentBySlug")
                .Produces<ApiResponse<StudentDto>>();

            routeGroupBuilder.MapPost("/", ChangeInformation)
                .WithName("ChangeStudentInfomation")
                .Accepts<StudentEditModel>("multipart/form-data")
                .Produces(401)
                .Produces<ApiResponse<StudentDto>>();

            //routeGroupBuilder.MapPost("/", CreateAccount)
            //    .WithName("CreateStudentAccount")
            //    .AddEndpointFilter<ValidatorFilter<RegisterRequest>>()
            //    .Produces<ApiResponse<AccountDto>>();

            routeGroupBuilder.MapPost("/change-password", ChangePassword)
                .WithName("ChangeStudentPassword")
                .Accepts<ResetPasswordRequest>("multipart/form-data")
                .Produces(401)
                .Produces<ApiResponse<string>>();

            routeGroupBuilder.MapGet("/get-filter", GetFilter)
                .WithName("GetStudentFilter")
                .Produces<ApiResponse<StudentFilterModel>>();

            //routeGroupBuilder.MapPost("/image/{slug:regex(^[a-z0-9_-]+$)}", SetImage)
            //  .WithName("SetStudentImage")
            //  .Accepts<IFormFile>("multipart/form-data")
            //  .Produces<ApiResponse<string>>();
        }

        private static async Task<IResult> GetStudent(
            [AsParameters] StudentFilterModel model,
            IStudentRepository studentRepository,
            IMapper mapper)
        {
            var query = mapper.Map<StudentQuery>(model);
            var students = await studentRepository.GetPagedStudentAsync<StudentDto>(query, model,
                students => students.ProjectToType<StudentDto>());
            var paginationResult = new PaginationResult<StudentDto>(students);
            return Results.Ok(ApiResponse.Success(paginationResult));
        }

        private static async Task<IResult> DeleteStudent(
            int id,
            IStudentRepository studentRepository)
        {
            return await studentRepository.DeleteStudentByIdAsync(id)
                ? Results.Ok(ApiResponse.Success("Xóa sinh viên thành công", HttpStatusCode.NoContent))
                : Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy sinh viên nào có id = {id}"));
        }

        private static async Task<IResult> GetAllStudent(
            IStudentRepository studentRepository)
        {
            var students = await studentRepository.GetStudentsAsync();
            return Results.Ok(ApiResponse.Success(students));
        }

        private static async Task<IResult> ChangeInformation(
            HttpContext context,
            IMapper mapper,
            IStudentRepository studentRepository,
            IMediaManager mediaManager)
        {
            var model = await StudentEditModel.BindAsync(context);
            var student = !string.IsNullOrWhiteSpace(model.UrlSlug) ? await studentRepository.GetStudentBySlugAsync(model.UrlSlug) : null;
            if(student == null)
            {
                student = new Student()
                {

                };
            }
            student.StudentId = model.StudentId;
            student.FullName = model.FullName;
            student.Email = model.Email;
            student.DoB = model.DoB;
            student.Phone = model.Phone;
            student.Class = model.Class;
            student.Year = model.Year;
            student.Address = model.Address;
            student.DepartmentId = model.DepartmentId;

            if(model.ImageFile?.Length > 0)
            {
                string hostname = $"{context.Request.Scheme}://{context.Request.Host}{context.Request.PathBase}/",
                    uploadPath = await mediaManager.SaveImgFileAsync(model.ImageFile.OpenReadStream(),
                                                                     model.ImageFile.FileName,
                                                                     model.ImageFile.ContentType);
                if(!string.IsNullOrWhiteSpace(uploadPath))
                {
                    student.ImageUrl = uploadPath;
                }
            }
            await studentRepository.UpdateStudentAsync(student);
            return Results.Ok(ApiResponse.Success(mapper.Map<StudentDto>(student), HttpStatusCode.Created));
        }

        private static async Task<IResult> GetStudentById(
            int id,
            IStudentRepository studentRepository,
            IMapper mapper)
        {
            var student = await studentRepository.GetStudentByIdAsync(id, true);
            return student == null
                ? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy sinh viên có mã số {id}"))
                : Results.Ok(ApiResponse.Success(mapper.Map<StudentDto>(student)));
        }

        private static async Task<IResult> GetStudentBySlug(
            string slug,
            IStudentRepository studentRepository,
            IMapper mapper)
        {
            var student = await studentRepository.GetStudentBySlugAsync(slug, true);
            return student == null
                ? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy sinh viên có Slug {slug}"))
                : Results.Ok(ApiResponse.Success(mapper.Map<StudentDto>(student)));
        }

        private static async Task<IResult> CreateAccount(
            RegisterRequest model,
            IStudentRepository studentRepository,
            IMapper mapper)
        {
            if (await studentRepository.IsStudentEmailExitedAsync(0, model.Email))
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.Conflict, $"Email '{model.Email}' đã được sử dụng"));
            }
            if (model.ConfirmPassword != model.Password)
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.Conflict, $"Mật khẩu và mật khẩu xác nhận không trùng khớp"));
            }
            if (model == null)
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.Conflict, $"Không được bỏ trống"));
            }
            var student = mapper.Map<Student>(model);
            student.RoleId = 1;
            await studentRepository.Register(student);
            return Results.Ok(ApiResponse.Success(mapper.Map<AccountDto>(student), HttpStatusCode.Created));
        }

        private static async Task<IResult> ChangePassword(
            HttpContext context,
            IMapper mapper,
            IStudentRepository studentRepository)
        {
            var model = await ResetPasswordRequest.BindAsync(context);
            var student = !string.IsNullOrWhiteSpace(model.UrlSlug) ? await studentRepository.GetStudentBySlugAsync(model.UrlSlug) : null;
            if (!BCrypt.Net.BCrypt.Verify(model.Password, student.Password))
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
            student.Password = BCrypt.Net.BCrypt.HashPassword(model.NewPassword);
            await studentRepository.UpdateStudentAsync(student);
            return Results.Ok(ApiResponse.Success(mapper.Map<StudentDto>(student), HttpStatusCode.Created));
        }

        private static async Task<IResult> GetFilter(
            IDepartmentRepository departmentRepository)
        {
            var model = new StudentFilterModel()
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
            IStudentRepository studentRepository,
            IMediaManager mediaManager)
        {
            var imageUrl = await mediaManager.SaveImgFileAsync(
                imageFile.OpenReadStream(),
                imageFile.FileName, imageFile.ContentType);
            if (string.IsNullOrWhiteSpace(imageUrl))
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, "Không lưu được tập tin"));
            }
            await studentRepository.SetImageAsync(slug, imageUrl);
            return Results.Ok(ApiResponse.Success(imageUrl));
        }
    }
}
