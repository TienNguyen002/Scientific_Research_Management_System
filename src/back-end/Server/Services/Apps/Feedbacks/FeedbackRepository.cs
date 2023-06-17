using Core.Contracts;
using Core.DTO.Feedback;
using Core.Entities;
using Data.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Services.Extensions;

namespace Services.Apps.Feedbacks
{
    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly WebDbContext _context;
        private readonly IMemoryCache _memoryCache;
        public FeedbackRepository(WebDbContext context, IMemoryCache memoryCache)
        {
            _context = context;
            _memoryCache = memoryCache;
        }

        public async Task<IList<FeedbackItem>> GetFeedbacksAsync(CancellationToken cancellationToken = default)
        {
            IQueryable<Feedback> feedbacks = _context.Set<Feedback>();
            return await feedbacks
                .OrderBy(f => f.CreateDate)
                .Select(f => new FeedbackItem()
                {
                    Id = f.Id,
                    Username = f.Username,
                    Content = f.Content,
                    CreateDate = f.CreateDate,
                })
                .ToListAsync(cancellationToken);
        }

        private IQueryable<Feedback> FindFeedbackByQueryable(FeedbackQuery query)
        {
            IQueryable<Feedback> feedbackQuery = _context.Set<Feedback>();
            if (!string.IsNullOrEmpty(query.Keyword))
            {
                feedbackQuery = feedbackQuery.Where(f => f.Username.Contains(query.Keyword)
                || f.Content.Contains(query.Keyword));
            }
            if(query.CreateMonth > 0)
            {
                feedbackQuery = feedbackQuery.Where(f => f.CreateDate.Month == query.CreateMonth);
            }
            if (query.CreateYear > 0)
            {
                feedbackQuery = feedbackQuery.Where(f => f.CreateDate.Year == query.CreateYear);
            }
            return feedbackQuery;
        }

        public async Task<IPagedList<T>> GetPagedFeedbacksAsync<T>(FeedbackQuery query, 
            IPagingParams pagingParams, 
            Func<IQueryable<Feedback>, IQueryable<T>> mapper, 
            CancellationToken cancellationToken = default)
        {
            IQueryable<Feedback> feedbacksResult = FindFeedbackByQueryable(query);
            IQueryable<T> result = mapper(feedbacksResult);
            return await result.ToPagedListAsync(pagingParams, cancellationToken);
        }

        public async Task<bool> AddFeedbackAsync(Feedback feedback, CancellationToken cancellationToken = default)
        {
            if (feedback.Id > 0)
            {
                _context.Update(feedback);
            }
            else
            {
                _context.Add(feedback);
            }
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<bool> RemoveFeedbackAsync(int id, CancellationToken cancellationToken = default)
        {
            var feedbackToDelete = await _context.Set<Feedback>()
                .Where(f => f.Id == id)
                .FirstOrDefaultAsync(cancellationToken);
            if(feedbackToDelete == null)
            {
                return false;
            }
            _context.Remove(feedbackToDelete);
            await _context.SaveChangesAsync(cancellationToken);
            return true;
        }

        public async Task<Feedback> GetFeedbackByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            return await _context.Set<Feedback>()
                .Where(f => f.Id == id)
                .FirstOrDefaultAsync(cancellationToken);
        }
    }
}
