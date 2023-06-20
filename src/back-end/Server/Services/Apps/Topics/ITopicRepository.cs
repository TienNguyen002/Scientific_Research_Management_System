using Core.Contracts;
using Core.DTO.Topic;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Apps.Topics
{
    public interface ITopicRepository
    {
        Task<IList<TopicItem>> GetTopicsAsync(CancellationToken cancellationToken = default);

        Task<Topic> GetTopicByIdAsync(int id, bool includeDetails = false, CancellationToken cancellationToken = default);

        Task<bool> IsTopicSlugExitedAsync(int id, string slug, CancellationToken cancellationToken = default);

        Task<Topic> GetTopicBySlugAsync(string slug, bool includeDetails = false, CancellationToken cancellationToken = default);

        Task<IPagedList<T>> GetPagedTopicsAsync<T>(TopicQuery query,
            IPagingParams pagingParams,
            Func<IQueryable<Topic>, IQueryable<T>> mapper,
            CancellationToken cancellationToken = default);

        Task<IPagedList<T>> GetPagedDoneTopicsAsync<T>(TopicQuery query,
            IPagingParams pagingParams,
            Func<IQueryable<Topic>, IQueryable<T>> mapper,
            CancellationToken cancellationToken = default);

        Task<bool> AddOrUpdateTopicAsync(Topic topic, CancellationToken cancellationToken = default);

        Task<bool> AddOrUpdateTopicBySlugAsync(Topic topic, CancellationToken cancellationToken = default);

        Task<bool> RemoveTopicAsync(int id, CancellationToken cancellationToken = default);

        Task<bool> RegisterTopic(int topicId, string studentSlug, CancellationToken cancellationToken = default);

        Task<bool> SetOutlineUrlAsync(string slug, string outlineUrl, CancellationToken cancellationToken = default);

        Task<bool> SetResultUrlAsync(string slug, string resultUrl, CancellationToken cancellationToken = default);

        Task<bool> IncreaseViewCountAsync(string slug, CancellationToken cancellationToken = default);

        Task<int> CountTopicAsync(CancellationToken cancellationToken = default);
        
        Task<int> CountTopicDoneAsync(CancellationToken cancellationToken = default);

        Task<IList<T>> GetNTopViewAsync<T>(int n,
            Func<IQueryable<Topic>, IQueryable<T>> mapper,
            CancellationToken cancellationToken = default);

        Task<IList<T>> GetNNewAsync<T>(int n,
           Func<IQueryable<Topic>, IQueryable<T>> mapper,
           CancellationToken cancellationToken = default);
    }
}
