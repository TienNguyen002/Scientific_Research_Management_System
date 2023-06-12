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

            routeGroupBuilder.MapPut("/{slug:regex(^[a-z0-9_-]+$)}/information", ChangeInformation)
                .WithName("ChangeStudentInf")
                .AddEndpointFilter<ValidatorFilter<StudentEditModel>>()
                .Produces<ApiResponse<string>>();

            routeGroupBuilder.MapPost("/", CreateAccount)
                .WithName("CreateStudentAccount")
                .AddEndpointFilter<ValidatorFilter<RegisterRequest>>()
                .Produces<ApiResponse<AccountDto>>();

            routeGroupBuilder.MapPut("/{slug:regex(^[a-z0-9_-]+$)}/change-password", ChangePassword)
                .WithName("ChangeStudentPassword")
                .AddEndpointFilter<ValidatorFilter<PasswordRequest>>()
                .Produces<ApiResponse<string>>();

            routeGroupBuilder.MapGet("/get-filter", GetFilter)
                .WithName("GetStudentFilter")
                .Produces<ApiResponse<StudentFilterModel>>();
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
            string slug,
            [AsParameters] StudentEditModel model,
            IMapper mapper,
            IStudentRepository studentRepository)
        {
            var student = await studentRepository.GetStudentBySlugAsync(slug);
            if (student == null)
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound,
                    $"Không tìm thấy sinh viên có slug {slug}"));
            }
            mapper.Map(model, student);
            return await studentRepository.UpdateStudentAsync(student)
               ? Results.Ok(ApiResponse.Success($"Thay đổi sinh viên có slug = {slug} thành công"))
               : Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy sinh viên có có slug = {slug}"));
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
            await studentRepository.CreateStudentAccountAsync(student);
            return Results.Ok(ApiResponse.Success(mapper.Map<AccountDto>(student), HttpStatusCode.Created));
        }

        private static async Task<IResult> ChangePassword(
            string slug,
            PasswordRequest model,
            IMapper mapper,
            IStudentRepository studentRepository)
        {
            var student = await studentRepository.GetStudentBySlugAsync(slug);
            if (student == null)
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound,
                    $"Không tìm thấy sinh viên có slug {slug}"));
            }
            if (await studentRepository.GetStudentPasswordBySlugAsync(slug, model.Password))
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound,
                    $"Mật khẩu hiện tại không đúng"));
            }
            if (model.NewPassword == model.Password)
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound,
                    $"Mật khẩu mới không được trùng với mật khẩu cũ"));
            }
            if (model.ConfirmPassword != model.NewPassword)
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound,
                    $"Mật khẩu xác nhận không trùng khớp"));
            }
            model.Password = model.NewPassword;
            mapper.Map(model, student);
            return await studentRepository.UpdateStudentAsync(student)
               ? Results.Ok(ApiResponse.Success($"Đổi mật khẩu của sinh viên có slug {slug} thành công"))
               : Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy sinh viên có có slug = {slug}"));
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
    }
}
