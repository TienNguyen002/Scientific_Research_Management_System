using Core.Contracts;
using Core.DTO.Topic;
using Core.Entities;
using Data.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Services.Extensions;
using SlugGenerator;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Apps.Topics
{
    public class TopicRepository : ITopicRepository
    {
        private readonly WebDbContext _context;
        private readonly IMemoryCache _memoryCache;
        public TopicRepository(WebDbContext context, IMemoryCache memoryCache)
        {
            _context = context;
            _memoryCache = memoryCache;
        }

        public async Task<IList<TopicItem>> GetTopicsAsync(CancellationToken cancellationToken = default)
        {
            IQueryable<Topic> topics = _context.Set<Topic>()
                .Include(t => t.Department)
                .Include(t => t.Lecturer)
                .Include(t => t.Students)
                .Include(t => t.Status)
                .Include(t => t.Process);
            return await topics
                .OrderBy(t => t.Title)
                .Select(t => new TopicItem()
                {
                    Id = t.Id,
                    Title = t.Title,
                    UrlSlug = t.UrlSlug,
                    Description = t.Description,
                    Department = t.Department.Name,
                    Lecturer = t.Lecturer.FullName,
                    Students = t.Students.ToString(),
                    Status = t.Status.Name,
                    Process = t.Process.Name,
                })
                .ToListAsync(cancellationToken);
        }

        public async Task<Topic> GetTopicByIdAsync(int id, bool includeDetails = false, CancellationToken cancellationToken = default)
        {
            if (!includeDetails)
            {
                return await _context.Set<Topic>().FindAsync(id);
            }
            return await _context.Set<Topic>()
                .Include(t => t.Department)
                .Include(t => t.Lecturer)
                .Include(t => t.Students)
                .Include(t => t.Status)
                .Include(t => t.Process)
                .Where(t => t.Id == id)
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<bool> IsTopicSlugExitedAsync(int id, string slug, CancellationToken cancellationToken = default)
        {
            return await _context.Set<Topic>()
                .AnyAsync(t => t.Id != id && t.UrlSlug == slug, cancellationToken);
        }

        public async Task<Topic> GetTopicBySlugAsync(string slug, bool includeDetails, CancellationToken cancellationToken)
        {
            if (!includeDetails)
            {
                return await _context.Set<Topic>().Where(t => t.UrlSlug == slug)
                    .FirstOrDefaultAsync(cancellationToken);
            }
            return await _context.Set<Topic>()
                .Include(t => t.Department)
                .Include(t => t.Lecturer)
                .Include(t => t.Students)
                .Include(t => t.Status)
                .Include(t => t.Process)
                .Where(t => t.UrlSlug == slug)
                .FirstOrDefaultAsync(cancellationToken);
        }

        private IQueryable<Topic> FindTopicByQueryable(TopicQuery query)
        {
            IQueryable<Topic> topicQuery = _context.Set<Topic>()
                .Include(t => t.Department)
                .Include(t => t.Lecturer)
                .Include(t => t.Students)
                .Include(t => t.Status)
                .Include(t => t.Process);
            if (!string.IsNullOrEmpty(query.Keyword))
            {
                topicQuery = topicQuery.Where(t => t.Title.Contains(query.Keyword)
                || t.UrlSlug.Contains(query.Keyword)
                || t.Description.Contains(query.Keyword));
            }
            if(query.DepartmentId > 0)
            {
                topicQuery = topicQuery.Where(t => t.DepartmentId == query.DepartmentId);
            }
            if (!string.IsNullOrWhiteSpace(query.DepartmentSlug))
            {
                topicQuery = topicQuery.Where(t => t.Department.UrlSlug.Contains(query.DepartmentSlug));
            }
            if(query.LecturerId > 0)
            {
                topicQuery = topicQuery.Where(t => t.LecturerId == query.LecturerId);
            }
            if (!string.IsNullOrWhiteSpace(query.LecturerSlug))
            {
                topicQuery = topicQuery.Where(t => t.Lecturer.UrlSlug.Contains(query.LecturerSlug));
            }
            if (query.StatusId > 0)
            {
                topicQuery = topicQuery.Where(t => t.StatusId == query.StatusId);
            }
            if(query.ProcessId > 0)
            {
                topicQuery = topicQuery.Where(t => t.ProcessId == query.ProcessId);
            }
            if(query.RegistrationMonth > 0)
            {
                topicQuery = topicQuery.Where(t => t.RegistrationDate.Month == query.RegistrationMonth);
            }
            if (query.RegistrationYear > 0)
            {
                topicQuery = topicQuery.Where(t => t.RegistrationDate.Year == query.RegistrationYear);
            }
            if(query.StudentNumbers > 0)
            {
                topicQuery = topicQuery.Where(t => t.StudentNumbers == query.StudentNumbers);
            }
            if(!string.IsNullOrWhiteSpace(query.Price))
            {
                topicQuery = topicQuery.Where(t => t.Price.Equals(query.Price));
            }
            if(query.Point > 0)
            {
                topicQuery = topicQuery.Where(t => t.Point == query.Point);
            }
            var students = query.GetRegisterStudents();
            if(students.Count > 0)
            {
                foreach(var student in students)
                {
                    topicQuery = topicQuery.Include(t => t.Students)
                        .Where(t => t.Students.Any(s => s.UrlSlug.Contains(student)));
                }
            }
            return topicQuery;
        }
        public async Task<IPagedList<T>> GetPagedTopicsAsync<T>(TopicQuery query, 
            IPagingParams pagingParams, 
            Func<IQueryable<Topic>, IQueryable<T>> mapper, 
            CancellationToken cancellationToken = default)
        {
            IQueryable<Topic> topicsResult = FindTopicByQueryable(query);
            IQueryable<T> result = mapper(topicsResult);
            return await result.ToPagedListAsync(pagingParams, cancellationToken);
        }

        public async Task<bool> AddOrUpdateTopicAsync(Topic topic, CancellationToken cancellationToken = default)
        {
            if (topic.Id > 0)
            {
                topic.UrlSlug = topic.Title.GenerateSlug();
                _context.Update(topic);
            }
            else
            {
                topic.UrlSlug = topic.Title.GenerateSlug();
                _context.Add(topic);
            } 
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<bool> RemoveTopicAsync(int id, CancellationToken cancellationToken = default)
        {
            var topicToDelete = await _context.Set<Topic>()
                .Include(t => t.Department)
                .Include(t => t.Lecturer)
                .Include(t => t.Students)
                .Include(t => t.Status)
                .Include(t => t.Process)
                .Where(t => t.Id == id)
                .FirstOrDefaultAsync(cancellationToken);
            if(topicToDelete == null)
            {
                return false;
            }
            _context.Remove(topicToDelete);
            await _context.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}
