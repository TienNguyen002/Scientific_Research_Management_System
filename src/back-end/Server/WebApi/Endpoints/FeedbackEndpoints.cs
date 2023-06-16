using Carter;
using Core.Collections;
using WebApi.Models;
using WebApi.Filters;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using Core.Entities;
using Services.Media;
using System.Net;
using Services.Apps.Feedbacks;
using WebApi.Models.Feedback;
using Core.DTO.Feedback;
using Mapster;

namespace WebApi.Endpoints
{
    public class FeedbackEndpoints : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            var routeGroupBuilder = app.MapGroup("/api/feedbacks");

            routeGroupBuilder.MapGet("/", GetFeedbacks)
                .WithName("GetFeedbacks")
                .Produces<ApiResponse<PaginationResult<FeedbackDto>>>();

            routeGroupBuilder.MapGet("/all", GetAllFeedback)
                .WithName("GetAllFeedback")
                .Produces<ApiResponse<PaginationResult<FeedbackDto>>>();

            routeGroupBuilder.MapGet("/get-filter", GetFilter)
                .WithName("GetFeedbackFilter")
                .Produces<ApiResponse<FeedbackFilterModel>>();

            routeGroupBuilder.MapPost("/", AddFeedback)
                .WithName("AddFeedback")
                .Accepts<FeedbackEditModel>("multipart/form-data")
                .Produces(401)
                .Produces<ApiResponse<FeedbackItem>>();

            routeGroupBuilder.MapDelete("/{id:int}", DeleteFeedback)
                .WithName("DeleteFeedback")
                .Produces<ApiResponse<string>>();

            routeGroupBuilder.MapGet("/{id:int}", GetFeedbackById)
                  .WithName("GetFeedbackById")
                  .Produces<ApiResponse<FeedbackDto>>();
        }

        private static async Task<IResult> GetAllFeedback(
            [FromServices] IFeedbackRepository feedbackRepository)
        {
            var feedbacks = await feedbackRepository.GetFeedbacksAsync();
            return Results.Ok(ApiResponse.Success(feedbacks));
        }

        private static async Task<IResult> GetFeedbacks(
            [AsParameters] FeedbackFilterModel model,
            IFeedbackRepository feedbackRepository,
            IMapper mapper)
        {
            var query = mapper.Map<FeedbackQuery>(model);
            var feedbacks = await feedbackRepository.GetPagedFeedbacksAsync<FeedbackDto>(query, model,
                feedbacks => feedbacks.ProjectToType<FeedbackDto>());
            var paginationResult = new PaginationResult<FeedbackDto>(feedbacks);
            return Results.Ok(ApiResponse.Success(paginationResult));
        }

        private static async Task<IResult> AddFeedback(
            HttpContext context,
            IMapper mapper,
            IFeedbackRepository feedbackRepository,
            IMediaManager mediaManager)
        {
            var model = await FeedbackEditModel.BindAsync(context);
            var feedback = model.Id > 0 ? await feedbackRepository.GetFeedbackByIdAsync(model.Id) : null;
            if (feedback == null)
            {
                feedback = new Feedback()
                {
                    CreateDate = DateTime.Now,
                };
            }
            feedback.Username = model.Username;
            feedback.Content = model.Content;
            await feedbackRepository.AddFeedbackAsync(feedback);
            return Results.Ok(ApiResponse.Success(mapper.Map<FeedbackDto>(feedback), HttpStatusCode.Created));
        }

        private static async Task<IResult> GetFilter()
        {
            var model = new FeedbackFilterModel()
            {
                
            };
            return Results.Ok(ApiResponse.Success(model));
        }

        private static async Task<IResult> DeleteFeedback(int id,
            IFeedbackRepository feedbackRepository)
        {
            return await feedbackRepository.RemoveFeedbackAsync(id)
                ? Results.Ok(ApiResponse.Success("Xóa feedback thành công", HttpStatusCode.NoContent))
                : Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy feedback có id = {id}"));
        }

        private static async Task<IResult> GetFeedbackById(int id,
            IFeedbackRepository feedbackRepository,
            IMapper mapper)
        {
            var feedback = await feedbackRepository.GetFeedbackByIdAsync(id);
            return feedback == null
                ? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy feedback có id {id}"))
                : Results.Ok(ApiResponse.Success(mapper.Map<FeedbackDto>(feedback)));
        }
    }
}
