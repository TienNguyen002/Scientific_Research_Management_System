using Core.Contracts;
using Core.DTO.Feedback;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Apps.Feedbacks
{
    public interface IFeedbackRepository
    {
        Task<IList<FeedbackItem>> GetFeedbacksAsync(CancellationToken cancellationToken = default);

        Task<IPagedList<T>> GetPagedFeedbacksAsync<T>(FeedbackQuery query,
            IPagingParams pagingParams,
            Func<IQueryable<Feedback>, IQueryable<T>> mapper,
            CancellationToken cancellationToken = default);

        Task<bool> AddFeedbackAsync(Feedback feedback, CancellationToken cancellationToken = default);

        Task<bool> RemoveFeedbackAsync(int id, CancellationToken cancellationToken = default);

        Task<Feedback> GetFeedbackByIdAsync(int id, CancellationToken cancellationToken = default);
    }
}
