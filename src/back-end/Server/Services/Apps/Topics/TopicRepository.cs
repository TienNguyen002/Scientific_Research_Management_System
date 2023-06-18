using Azure;
using Core.Contracts;
using Core.DTO.Topic;
using Core.Entities;
using Data.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Services.Apps.Students;
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
                .Include(t => t.Status);
            return await topics
                .OrderBy(t => t.RegistrationDate)
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
                .Where(t => t.UrlSlug == slug)
                .FirstOrDefaultAsync(cancellationToken);
        }

        private IQueryable<Topic> FindTopicByQueryable(TopicQuery query)
        {
            IQueryable<Topic> topicQuery = _context.Set<Topic>()
                .Include(t => t.Department)
                .Include(t => t.Lecturer)
                .Include(t => t.Students)
                .Include(t => t.Status);
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
            if(query.RegistrationMonth > 0)
            {
                topicQuery = topicQuery.Where(t => t.RegistrationDate.Month == query.RegistrationMonth);
            }
            if (query.EndMonth > 0)
            {
                topicQuery = topicQuery.Where(t => t.EndDate.Month == query.EndMonth);
            }
            if (query.RegistrationYear > 0)
            {
                topicQuery = topicQuery.Where(t => t.RegistrationDate.Year == query.RegistrationYear);
            }
            if (query.EndYear > 0)
            {
                topicQuery = topicQuery.Where(t => t.EndDate.Year == query.EndYear);
            }
            if (query.StudentNumbers > 0)
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

        public async Task<bool> RegisterTopic(int topicId, string studentSlug, CancellationToken cancellationToken = default)
        {
            //if(topic.Id > 0)
            //{
            //    await _context.Entry(topic).Collection(t => t.Students).LoadAsync(cancellationToken);
            //}
            //else
            //{
            //    topic.Students = new List<Student>();
            //}
            //var validStudents = students.Where(x => !string.IsNullOrWhiteSpace(x))
            //    .Select(x => new
            //    {
            //        Name = x,
            //        Slug = x.GenerateSlug()
            //    })
            //    .GroupBy(x => x.Slug)
            //    .ToDictionary(g => g.Key, g => g.First().Name);


            //foreach (var kv in validStudents)
            //{
            //    if (topic.Students.Any(x => string.Compare(x.UrlSlug, kv.Key, StringComparison.InvariantCultureIgnoreCase) == 0)) continue;

            //    var student = await GetStudentBySlugAsync(kv.Key, cancellationToken) ?? new Student()
            //    {
            //        FullName = kv.Value,
            //        UrlSlug = kv.Key
            //    };
            //    if(student == null) { return false; }
            //    topic.Students.Add(student);
            //}

            //topic.Students = topic.Students.Where(t => validStudents.ContainsKey(t.UrlSlug)).ToList();

            //if(topic.Students.Count == topic.StudentNumbers)
            //{
            //    topic.StatusId = 2;
            //}
            //_context.Update(topic);
            var topic = await _context.Set<Topic>()
                .Include(t => t.Department)
                .Include(t => t.Lecturer)
                .Include(t => t.Students)
                .Include(t => t.Status)
                .Where(t => t.Id == topicId)
                .FirstOrDefaultAsync(cancellationToken);
            if(topic == null)
            {
                return false;
            }
            var student = await _context.Set<Student>()
                .Where(s => s.UrlSlug == studentSlug)
                .FirstOrDefaultAsync(cancellationToken);
            topic.Students.Add(student);
            if (topic.Students.Count == topic.StudentNumbers)
            {
                topic.StatusId = 2;
            }
            _context.Update(topic);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        private async Task<Student> GetStudentBySlugAsync(string slug, CancellationToken cancellationToken = default)
        {
            return await _context.Set<Student>()
                .Include(x => x.Topics)
                .Where(x => x.UrlSlug == slug)
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<bool> SetOutlineUrlAsync(string slug, string outlineUrl, CancellationToken cancellationToken = default)
        {
            return await _context.Set<Topic>()
                .Where(t => t.UrlSlug == slug)
                .ExecuteUpdateAsync(s => s.SetProperty(s => s.OutlineUrl, outlineUrl), cancellationToken) > 0;
        }

        public async Task<bool> SetResultUrlAsync(string slug, string resultUrl, CancellationToken cancellationToken = default)
        {
            return await _context.Set<Topic>()
                .Where(t => t.UrlSlug == slug)
                .ExecuteUpdateAsync(s => s.SetProperty(s => s.ResultUrl, resultUrl), cancellationToken) > 0;
        }

        public async Task IncreaseViewCountAsync(string slug, CancellationToken cancellationToken = default)
        {
            await _context.Set<Topic>()
                .Where(x => x.UrlSlug == slug)
                .ExecuteUpdateAsync(p =>
                    p.SetProperty(x => x.ViewCount, x => x.ViewCount + 1), cancellationToken);
        }

        public async Task<int> CountTopicAsync(CancellationToken cancellationToken = default)
        {
            return await _context.Set<Topic>().CountAsync(cancellationToken);
        }

        public async Task<int> CountTopicDoneAsync(CancellationToken cancellationToken = default)
        {
            return await _context.Set<Topic>()
                .Where(t => t.StatusId == 3)
                .CountAsync(cancellationToken);
        }

        public async Task<IPagedList<T>> GetPagedDoneTopicsAsync<T>(TopicQuery query, IPagingParams pagingParams, Func<IQueryable<Topic>, IQueryable<T>> mapper, CancellationToken cancellationToken = default)
        {
            IQueryable<Topic> topicsResult = FindTopicByQueryable(query)
                .Where(t => t.StatusId == 3);
            IQueryable<T> result = mapper(topicsResult);
            return await result.ToPagedListAsync(pagingParams, cancellationToken);
        }

        public async Task<IList<T>> GetNTopViewAsync<T>(int n, Func<IQueryable<Topic>, IQueryable<T>> mapper, CancellationToken cancellationToken = default)
        {
            var topView = _context.Set<Topic>()
                .Include(t => t.Department)
                .Where(t => t.StatusId == 3)
                .OrderByDescending(t => t.ViewCount)
                .Take(n);
            return await mapper(topView).ToListAsync(cancellationToken);
        }

        public async Task<IList<T>> GetNNewAsync<T>(int n, Func<IQueryable<Topic>, IQueryable<T>> mapper, CancellationToken cancellationToken = default)
        {
            var newTopic = _context.Set<Topic>()
                .Include(t => t.Department)
                .Where(t => t.StatusId == 3)
                .OrderByDescending(t => t.Id)
                .Take(n);
            return await mapper(newTopic).ToListAsync(cancellationToken);
        }
    }
}
