using Azure;
using Carter;
using Core.Collections;
using Core.DTO.Department;
using Core.DTO.Topic;
using Core.Entities;
using Mapster;
using MapsterMapper;
using Services.Apps.Departments;
using Services.Apps.Topics;
using SlugGenerator;
using System.Net;
using WebApi.Filters;
using WebApi.Models;
using WebApi.Models.Department;
using WebApi.Models.Topic;

namespace WebApi.Endpoints
{
    public class DepartmentEndpoints : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            var routeGroupBuilder = app.MapGroup("/api/departments");

            routeGroupBuilder.MapGet("/", GetDepartments)
                .WithName("GetDepartments")
                .Produces<ApiResponse<PaginationResult<DepartmentDto>>>();

            routeGroupBuilder.MapGet("/all", GetAllDepartment)
                .WithName("GetAllDepartment")
                .Produces<ApiResponse<PaginationResult<DepartmentItems>>>();

            routeGroupBuilder.MapGet("/{id:int}", GetDepartmentById)
                  .WithName("GetDepartmentById")
                  .Produces<ApiResponse<DepartmentDto>>();

            routeGroupBuilder.MapGet("/byslug/{slug:regex(^[a-z0-9_-]+$)}", GetDepartmentBySlug)
                  .WithName("GetDepartmentBySlug")
                  .Produces<ApiResponse<DepartmentDto>>();

            routeGroupBuilder.MapPost("/", AddDepartment)
                .WithName("AddDepartment")
                .Accepts<DepartmentEditModel>("multipart/form-data")
                .Produces(401)
                .Produces<ApiResponse<DepartmentItems>>();

            routeGroupBuilder.MapDelete("/{id:int}", DeleteDepartment)
                .WithName("DeleteDepartment")
                .Produces<ApiResponse<string>>();
        }

        private static async Task<IResult> GetAllDepartment(
            IDepartmentRepository departmentRepository)
        {
            var depart = await departmentRepository.GetAllDepartmentAsync();
            return Results.Ok(ApiResponse.Success(depart));
        }

        private static async Task<IResult> GetDepartments(
            [AsParameters] DepartmentFilterModel model,
            IDepartmentRepository departmentRepository,
            IMapper mapper)
        {
            var query = mapper.Map<DepartmentQuery>(model);
            var departments = await departmentRepository.GetPagedDepartmentAsync<DepartmentDto>(query, model,
                departments => departments.ProjectToType<DepartmentDto>());
            var paginationResult = new PaginationResult<DepartmentDto>(departments);
            return Results.Ok(ApiResponse.Success(paginationResult));
        }

        private static async Task<IResult> GetDepartmentById(int id,
            IDepartmentRepository departmentRepository,
            IMapper mapper)
        {
            var department = await departmentRepository.GetDepartmentByIdAsync(id, true);
            return department == null
                ? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy khoa có mã số {id}"))
                : Results.Ok(ApiResponse.Success(mapper.Map<DepartmentDto>(department)));
        }

        private static async Task<IResult> GetDepartmentBySlug(string slug,
            IDepartmentRepository departmentRepository,
            IMapper mapper)
        {
            var department = await departmentRepository.GetDepartmentBySlugAsync(slug, true);
            return department == null
                ? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy khoa có slug {slug}"))
                : Results.Ok(ApiResponse.Success(mapper.Map<DepartmentDto>(department)));
        }

        private static async Task<IResult> AddDepartment (
            HttpContext context,
            IDepartmentRepository departmentRepository,
            IMapper mapper)
        {
            var model = await DepartmentEditModel.BindAsync(context);
            var slug = model.Name.GenerateSlug();
            if(await departmentRepository.IsDepartmentExistBySlugAsync(model.Id, slug))
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.Conflict, $"Slug '{slug}' đã tồn tại"));
            }
            var depart = model.Id > 0 ? await departmentRepository.GetDepartmentByIdAsync(model.Id) : null;
            if(depart == null)
            {
                depart = new Department()
                {

                };
            }
            depart.Name = model.Name;
            depart.UrlSlug = model.Name.GenerateSlug();
            await departmentRepository.AddOrUpdateDepartmentAsync(depart);

            return Results.Ok(ApiResponse.Success(
                mapper.Map<DepartmentItems>(depart), HttpStatusCode.Created));
        }

        private static async Task<IResult> DeleteDepartment(
            int id,
            IDepartmentRepository departmentRepository)
        {
            return await departmentRepository.DeleteDepartmentByIdAsync(id)
              ? Results.Ok(ApiResponse.Success("Xóa Khoa thành công", HttpStatusCode.NoContent))
              : Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy Khoa có id = {id}"));
        }
    }
}
