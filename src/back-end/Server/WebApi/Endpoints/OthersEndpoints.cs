using Carter;
using Core.Collections;
using Core.DTO.Others;
using Core.DTO.Roles;
using Core.DTO.Topic;
using Mapster;
using MapsterMapper;
using Services.Apps.Departments;
using Services.Apps.Lecturers;
using Services.Apps.Others;
using Services.Apps.Students;
using Services.Apps.Topics;
using WebApi.Models;
using WebApi.Models.Others;
using WebApi.Models.Topic;

namespace WebApi.Endpoints
{
    public class OthersEndpoints : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            var routeGroupBuilder = app.MapGroup("/api/others");

            routeGroupBuilder.MapGet("/status", GetAllStatus)
                .WithName("GetAllStatus")
                .Produces<ApiResponse<PaginationResult<StatusItem>>>();

            routeGroupBuilder.MapGet("/roles", GetAllRoles)
                .WithName("GetAllRoles")
                .Produces<ApiResponse<PaginationResult<RoleItems>>>();
        }

        private static async Task<IResult> GetAllStatus(
            IAppRepository appRepository)
        {
            var status = await appRepository.GetStatusAsync();
            return Results.Ok(ApiResponse.Success(status));
        }

        private async Task<IResult> GetAllRoles(
            IAppRepository appRepository)
        {
            var roles = await appRepository.GetAllRolesAsync();
            return Results.Ok(ApiResponse.Success(roles));
        }
    }
}
