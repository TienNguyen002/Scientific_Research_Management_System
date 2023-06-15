using Carter;
using Core.Collections;
using Core.DTO.Lecturer;
using MapsterMapper;
using Services.Apps.Lecturers;
using WebApi.Models;
using WebApi.Models.Lecturer;

namespace WebApi.Endpoints
{
    public class AccountEndpoints : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            var routeGroupBuilder = app.MapGroup("/api/");

            routeGroupBuilder.MapGet("/login", GetLecturer)
                .WithName("Get")
                .Produces<ApiResponse<LecturerItem>>();
        }

        private static async Task<IResult> GetLecturer(
            [AsParameters] LecturerFilterModel model,
            ILecturerRepository lecturerRepository,
            IMapper mapper)
        {
           
            return Results.Ok(ApiResponse.Success("Ok"));
        }
    }
}
