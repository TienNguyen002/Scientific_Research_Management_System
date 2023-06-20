using Core.Contracts;
using Core.DTO.Lecturer;
using Core.DTO.Student;
using Core.Entities;
using Data.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Services.Extensions;
using Services.Helper;
using SlugGenerator;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Apps.Lecturers
{
    public class LecturerRepository : ILecturerRepository
    {
        private readonly WebDbContext _context;
        private readonly IMemoryCache _memoryCache;
        public LecturerRepository(WebDbContext context, IMemoryCache memoryCache)
        {
            _context = context;
            _memoryCache = memoryCache;
        }

        public async Task<IList<LecturerItem>> GetLecturersAsync(CancellationToken cancellationToken = default)
        {
            IQueryable<Lecturer> lecturers = _context.Set<Lecturer>()
                .Include(l => l.Department);
            return await lecturers
                .OrderBy(l => l.FullName)
                .Select(l => new LecturerItem()
                {
                    Id = l.Id,
                    FullName = l.FullName,
                    Email = l.Email,
                    UrlSlug = l.UrlSlug,
                    Department = l.Department.Name,
                    Qualification = l.Qualification,
                    DoB = l.DoB,
                })
                .ToListAsync(cancellationToken);
        }

        public async Task<Lecturer> GetLecturerByIdAsync(int id, bool includeDetails = false, CancellationToken cancellationToken = default)
        {
            if (!includeDetails)
            {
                return await _context.Set<Lecturer>().FindAsync(id);
            }
            return await _context.Set<Lecturer>()
                .Include(x => x.Department)
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<Lecturer> GetLecturerBySlugAsync(string slug, bool includeDetails = false, CancellationToken cancellationToken = default)
        {
            if (!includeDetails)
            {
                return await _context.Set<Lecturer>().Where(p => p.UrlSlug == slug)
                    .FirstOrDefaultAsync(cancellationToken);
            }
            return await _context.Set<Lecturer>()
                .Include(x => x.Department)
                .Where(x => x.UrlSlug == slug)
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<bool> IsLecturerEmailExitedAsync(int id, string email, CancellationToken cancellationToken = default)
        {
            return await _context.Set<Lecturer>()
                .AnyAsync(l => l.Id != id && l.Email == email, cancellationToken);
        }

        public async Task<bool> IsLecturerSlugExitedAsync(int id, string slug, CancellationToken cancellationToken = default)
        {
            return await _context.Set<Lecturer>()
                .AnyAsync(t => t.Id != id && t.UrlSlug == slug, cancellationToken);
        }

        private IQueryable<Lecturer> GetLecturerByQueryable(LecturerQuery query)
        {
            IQueryable<Lecturer> lecturerQuery = _context.Set<Lecturer>()
                .Include(l => l.Department);
            if (!string.IsNullOrEmpty(query.Keyword))
            {
                lecturerQuery = lecturerQuery.Where(l => l.FullName.Contains(query.Keyword)
                || l.Email.Contains(query.Keyword)
                || l.UrlSlug.Contains(query.Keyword)
                || l.Qualification.Contains(query.Keyword));
            }
            if(query.DepartmentId > 0)
            {
                lecturerQuery = lecturerQuery.Where(l => l.DepartmentId == query.DepartmentId);
            }
            if (!string.IsNullOrWhiteSpace(query.DepartmentSlug))
            {
                lecturerQuery = lecturerQuery.Where(x => x.Department.UrlSlug.Contains(query.DepartmentSlug));
            }
            return lecturerQuery;
        }
        public async Task<IPagedList<T>> GetPagedLecturesAsync<T>(LecturerQuery query,
            IPagingParams pagingParams, 
            Func<IQueryable<Lecturer>, IQueryable<T>> mapper,  
            CancellationToken cancellationToken = default)
        {
            IQueryable<Lecturer> lecturerFindResultsQuery = GetLecturerByQueryable(query);
            IQueryable<T> result = mapper(lecturerFindResultsQuery);
            return await result.ToPagedListAsync(pagingParams, cancellationToken);
        }

        public async Task<bool> CreateLecturerAccountAsync(Lecturer lecturer, CancellationToken cancellationToken = default)
        {
            lecturer.UrlSlug = lecturer.FullName.GenerateSlug();
            //lecturer.UrlSlug = SlugHelper.GenerateSlug(lecturer.FullName);
            _context.Add(lecturer); 
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<bool> UpdateLecturerAsync(Lecturer lecturer, CancellationToken cancellationToken = default)
        {
            lecturer.UrlSlug = lecturer.FullName.GenerateSlug();
            //lecturer.UrlSlug = SlugHelper.GenerateSlug(lecturer.FullName);
            _context.Update(lecturer);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<bool> GetLecturerPasswordBySlugAsync(string slug, string password, CancellationToken cancellationToken = default)
        {
            return await _context.Set<Lecturer>()
                .AnyAsync(l => l.UrlSlug == slug && l.Password != password, cancellationToken);
        }

        public async Task<bool> DeleteLecturerByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            var lecturerToDelete = await _context.Set<Lecturer>()
                .Include(l => l.Department)
                .Include(l => l.Role)
                .Where(l => l.Id == id)
                .FirstOrDefaultAsync(cancellationToken);
            if(lecturerToDelete == null)
            {
                return false;
            }
            _context.Remove(lecturerToDelete);
            await _context.SaveChangesAsync(cancellationToken);
            return true;
        }

        public async Task<bool> SetImageAsync(string slug, string imageUrl, CancellationToken cancellationToken = default)
        {
            return await _context.Set<Lecturer>()
                .Where(t => t.UrlSlug == slug)
                .ExecuteUpdateAsync(s => s.SetProperty(s => s.ImageUrl, imageUrl), cancellationToken) > 0;
        }

        public async Task<int> CountLecturerAsync(CancellationToken cancellationToken = default)
        {
            return await _context.Set<Lecturer>().CountAsync(cancellationToken);
        }

        public async Task<bool> AddOrUpdateLecturerAsync(Lecturer lecturer, CancellationToken cancellationToken = default)
        {
            if (lecturer.Id > 0)
            {
                _context.Update(lecturer);
            }
            else
            {
                _context.Add(lecturer);
            } 
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }
    }
}
