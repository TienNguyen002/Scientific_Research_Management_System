using Carter;
using Core.Collections;
using Core.DTO.Others;
using Services.Apps.Others;
using WebApi.Models;

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
        }

        private static async Task<IResult> GetAllStatus(
            IAppRepository appRepository)
        {
            var status = await appRepository.GetStatusAsync();
            return Results.Ok(ApiResponse.Success(status));
        }
    }
}
