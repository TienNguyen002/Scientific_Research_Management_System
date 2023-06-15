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
using Services.Apps.Topics;

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
                .AddEndpointFilter<ValidatorFilter<FeedbackEditModel>>()
                .Produces<ApiResponse<FeedbackDto>>();

            routeGroupBuilder.MapDelete("/{id:int}", DeleteFeedback)
                .WithName("DeleteFeedback")
                .Produces<ApiResponse<string>>();
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
            [AsParameters] FeedbackEditModel model,
            IMapper mapper,
            IFeedbackRepository feedbackRepository,
            IMediaManager mediaManager)
        {
            var feedback = mapper.Map<Feedback>(model);
            feedback.CreateDate = DateTime.Now;
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
    }
}
