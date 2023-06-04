using Azure;
using Carter;
using Core.Collections;
using Core.DTO.Department;
using Core.Entities;
using MapsterMapper;
using Services.Apps.Departments;
using System.Net;
using WebApi.Filters;
using WebApi.Models;
using WebApi.Models.Department;

namespace WebApi.Endpoints
{
    public class DepartmentEndpoint : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            var routeGroupBuilder = app.MapGroup("/api/Departments");

            routeGroupBuilder.MapGet("/allDepartment", GetAllDepartment)
                .WithName("GetAllDepartment")
                .Produces<ApiResponse<PaginationResult<DepartmentItems>>>();

            routeGroupBuilder.MapPost("/", AddDepartment)
                .WithName("AddDepartment")
                .AddEndpointFilter<ValidatorFilter<DepartmentEditmodel>>()
                .Produces<ApiResponse<DepartmentItems>>();

            routeGroupBuilder.MapPut("/{id:int}", UpdateDepartment)
                .WithName("UpdateDepartment")
                .AddEndpointFilter<ValidatorFilter<DepartmentEditmodel>>()
                .Produces<ApiResponse<string>>();

            routeGroupBuilder.MapDelete("/{id:int}", DeleteTag)
                .WithName("DeleteDepartment")
                .Produces<ApiResponse<string>>();

  
        }


        private static async Task<IResult> GetAllDepartment(
            IDepartmentRepository departmentRepository)
        {
            var depart = await departmentRepository.GetAllDepartmentAsync();
            return Results.Ok(ApiResponse.Success(depart));
        }

        private static async Task<IResult> AddDepartment (
            DepartmentEditmodel model,
            IDepartmentRepository departmentRepository,
            IMapper mapper)
        {
            if (await departmentRepository.IsDepartmentExistBySlugAsync(0, model.UrlSlug))
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.Conflict,
                    $"Slug '{model.UrlSlug}' đã được sử dụng"));
            }
            var depart = mapper.Map<Department>(model);
            await departmentRepository.AddOrUpdateDepartmentAsync(depart);

            return Results.Ok(ApiResponse.Success(
                mapper.Map<DepartmentItems>(depart), HttpStatusCode.Created));
        }

        private static async Task<IResult> UpdateDepartment(
            int id, DepartmentEditmodel model,
            IDepartmentRepository departmentRepository,
            IMapper mapper)
        {
            if (await departmentRepository.IsDepartmentExistBySlugAsync(0, model.UrlSlug))
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.Conflict,
                    $"Slug '{model.UrlSlug}' đã được sử dụng"));
            }

            var depart = mapper.Map<Department>(model);
            depart.Id = id;

            return await departmentRepository.AddOrUpdateDepartmentAsync(depart)
              ? Results.Ok(ApiResponse.Success("Cập nhật Khoa thành công", HttpStatusCode.NoContent))
              : Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy Khoa có id = {id}"));
        }

        private static async Task<IResult> DeleteTag(
            int id,
            IDepartmentRepository departmentRepository)
        {
            return await departmentRepository.DeleteDepartmentByIdAsync(id)
              ? Results.Ok(ApiResponse.Success("Xóa Khoa thành công", HttpStatusCode.NoContent))
              : Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy Khoa có id = {id}"));
        }
    }
}
