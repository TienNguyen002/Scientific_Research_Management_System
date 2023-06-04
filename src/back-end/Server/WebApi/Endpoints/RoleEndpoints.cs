using Carter;
using Core.Collections;
using MapsterMapper;
using WebApi.Models;
using System.Net;
using Mapster;
using WebApi.Filters;
using Core.Entities;
using Services.Apps.Rolee;
using Core.DTO.Roles;

namespace WebApi.Endpoints
{
    public class RoleEndpoints : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            var routeGroupBuilder = app.MapGroup("/api/Role");

            routeGroupBuilder.MapGet("/", GetAllRoles)
                .WithName("GetAllRoles")           
                .Produces<ApiResponse<PaginationResult<RoleItems>>>();
        }

        private async Task<IResult> GetAllRoles(
            IRoleRepository roleRepository)
        {
            var roles = await roleRepository.GetAllRolesAsync();
            return Results.Ok(ApiResponse.Success(roles));
        }
    }
}
