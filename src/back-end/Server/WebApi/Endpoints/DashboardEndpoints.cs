using Carter;
using Services.Apps.Departments;
using Services.Apps.Lecturers;
using Services.Apps.Students;
using Services.Apps.Topics;
using WebApi.Models;
using WebApi.Models.Dashboard;

namespace WebApi.Endpoints
{
    public class DashboardEndpoints : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            var routeGroupBuilder = app.MapGroup("/api/dashboard");

            routeGroupBuilder.MapGet("/", GetInfoDashboard)
                .WithName("GetInfoDashboard")
                .Produces<DashboardModel>();
        }

        private static async Task<IResult> GetInfoDashboard(
            IDepartmentRepository departmentRepository,
            ILecturerRepository lecturerRepository,
            IStudentRepository studentRepository,
            ITopicRepository topicRepository)
        {
            var result = new DashboardModel()
            {
                CountDepartment = await departmentRepository.CountDepartmentAsync(),
                CountLecturer = await lecturerRepository.CountLecturerAsync(),
                CountStudent = await studentRepository.CountStudentAsync(),
                CountTopic = await topicRepository.CountTopicAsync(),
                CountTopicDone = await topicRepository.CountTopicDoneAsync(),
            };
            return Results.Ok(ApiResponse.Success(result));
        }
    }
}
