using Carter;
using Core.Collections;
using Core.DTO.Topic;
using Mapster;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Services.Apps.Topics;
using System.Net;
using WebApi.Filters;
using WebApi.Models;
using WebApi.Models.Topic;

namespace WebApi.Endpoints
{
    public class TopicEndpoints : ICarterModule
    {
        public void AddRoutes(IEndpointRouteBuilder app)
        {
            var routeGroupBuilder = app.MapGroup("/api/topics");

            routeGroupBuilder.MapGet("/", GetTopics)
                .WithName("GetTopics")
                .Produces<ApiResponse<PaginationResult<TopicDto>>>();

            routeGroupBuilder.MapGet("/all", GetAllTopic)
                .WithName("GetAllTopic")
                .Produces<ApiResponse<PaginationResult<TopicItem>>>();

            routeGroupBuilder.MapGet("/{id:int}", GetTopicById)
                  .WithName("GetTopicById")
                  .Produces<ApiResponse<TopicDto>>();

            routeGroupBuilder.MapGet("/byslug/{slug:regex(^[a-z0-9_-]+$)}", GetTopicBySlug)
                  .WithName("GetTopicBySlug")
                  .Produces<ApiResponse<TopicDto>>();

            //routeGroupBuilder.MapPost("/", AddCourse)
            //    .WithName("AddCourse")
            //    .AddEndpointFilter<ValidatorFilter<TopicEditModel>>()
            //    .Produces<ApiResponse<TopicDto>>();

            //routeGroupBuilder.MapPut("/{id:int}", UpdateCourse)
            //    .WithName("UpdateCourse")
            //    .AddEndpointFilter<ValidatorFilter<TopicEditModel>>()
            //    .Produces<ApiResponse<string>>();

            routeGroupBuilder.MapDelete("/{id:int}", DeleteTopic)
                .WithName("DeleteTopic")
                .Produces<ApiResponse<string>>();
        }

        private static async Task<IResult> GetAllTopic(
            [FromServices] ITopicRepository topicRepository)
        {
            var topics = await topicRepository.GetTopicsAsync();
            return Results.Ok(ApiResponse.Success(topics));
        }

        private static async Task<IResult> GetTopics(
            [AsParameters] TopicFilterModel model,
            ITopicRepository topicRepository,
            IMapper mapper)
        {
            var query = mapper.Map<TopicQuery>(model);
            var topics = await topicRepository.GetPagedTopicsAsync<TopicDto>(query, model,
                topics => topics.ProjectToType<TopicDto>());
            var paginationResult = new PaginationResult<TopicDto>(topics);
            return Results.Ok(ApiResponse.Success(paginationResult));
        }

        private static async Task<IResult> GetTopicById(int id,
            ITopicRepository topicRepository,
            IMapper mapper)
        {
            var topics = await topicRepository.GetTopicByIdAsync(id, true);
            return topics == null
                ? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy đề tài có mã số {id}"))
                : Results.Ok(ApiResponse.Success(mapper.Map<TopicDto>(topics)));
        }

        private static async Task<IResult> GetTopicBySlug(string slug,
            ITopicRepository topicRepository,
            IMapper mapper)
        {
            var topics = await topicRepository.GetTopicBySlugAsync(slug, true);
            return topics == null
                ? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy đề tài có slug {slug}"))
                : Results.Ok(ApiResponse.Success(mapper.Map<TopicDto>(topics)));
        }

        private static async Task<IResult> DeleteTopic(int id,
            ITopicRepository topicRepository)
        {
            return await topicRepository.RemoveTopicAsync(id)
                ? Results.Ok(ApiResponse.Success("Xóa đề tài thành công", HttpStatusCode.NoContent))
                : Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy đề tài có id = {id}"));
        }
    }
}
