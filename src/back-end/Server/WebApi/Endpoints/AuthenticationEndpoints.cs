using Carter;
using Services.Apps.Students;
using WebApi.Models;

namespace WebApi.Endpoints
{
    public class AuthenticationEndpoints : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            var routeGroupBulder = app.MapGroup("/api/authentication");

            
        }
    }


}
