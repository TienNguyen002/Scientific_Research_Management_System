using Azure;
using Core.Contracts;
using Core.DTO.Department;
using Core.Entities;
using Data.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Services.Extensions;
using SlugGenerator;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Services.Apps.Departments
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly WebDbContext _context;
        private readonly IMemoryCache _memoryCache;
        public DepartmentRepository(WebDbContext context, IMemoryCache memoryCache)
        {
            _context = context;
            _memoryCache = memoryCache;
        }

        public async Task<IList<DepartmentItems>> GetAllDepartmentAsync(CancellationToken cancellationToken = default)
        {
            IQueryable<Department> depart = _context.Set<Department>();
            return await depart
                .OrderBy(x => x.Name)
                .Select(x => new DepartmentItems()
                {
                    Id = x.Id,
                    Name = x.Name,
                    UrlSlug = x.UrlSlug,
                })
                .ToListAsync(cancellationToken);
        }
     
        public async Task<bool> IsDepartmentExistBySlugAsync(
            int id,
            string slug,
            CancellationToken cancellationToken = default)
        {
            return await _context.Set<Department>()
                .AnyAsync(c => c.Id != id && c.UrlSlug == slug, cancellationToken);
        }

        public async Task<bool> AddOrUpdateDepartmentAsync(Department depart, CancellationToken cancellationToken = default)
        {
            if (depart.Id > 0)
            {
                _context.Update(depart);   
            }
            else
            {
                _context.Add(depart);
            }
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<bool> DeleteDepartmentByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            var departmentToDelete = await _context.Set<Department>()
                .Include(x => x.Lecturers)
                .Include(x => x.Students)
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync(cancellationToken);
            if(departmentToDelete == null)
            {
                return false;
            }
            _context.Remove(departmentToDelete);
            await _context.SaveChangesAsync(cancellationToken);
            return true;
        }

        public async Task<Department> GetDepartmentByIdAsync(int id, bool includeDetails = false, CancellationToken cancellationToken = default)
        {
            if (!includeDetails)
            {
                return await _context.Set<Department>().FindAsync(id);
            }
            return await _context.Set<Department>()
                .Include(x => x.Students)
                .Include(x => x.Lecturers)
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<Department> GetDepartmentBySlugAsync(string slug, bool includeDetails = false, CancellationToken cancellationToken = default)
        {
            if (!includeDetails)
            {
                return await _context.Set<Department>().Where(d => d.UrlSlug == slug)
                    .FirstOrDefaultAsync(cancellationToken);
            }
            return await _context.Set<Department>()
                .Include(d => d.Students)
                .Include(d => d.Lecturers)
                .Where(d => d.UrlSlug == slug)
                .FirstOrDefaultAsync(cancellationToken);
        }

        private IQueryable<Department> FindDepartmentByQueryable(DepartmentQuery query)
        {
            IQueryable<Department> departmentQuery = _context.Set<Department>()
                .Include(d => d.Students)
                .Include(d => d.Lecturers);
            if (!string.IsNullOrWhiteSpace(query.Keyword))
            {
                departmentQuery = departmentQuery.Where(d => d.Name.Contains(query.Keyword)
                || d.UrlSlug.Contains(query.Keyword));
            }
            return departmentQuery;
        }

        public async Task<IPagedList<T>> GetPagedDepartmentAsync<T>(DepartmentQuery query, 
            IPagingParams pagingParams, 
            Func<IQueryable<Department>, IQueryable<T>> mapper, 
            CancellationToken cancellationToken = default)
        {
            IQueryable<Department> departmentResults = FindDepartmentByQueryable(query);
            IQueryable<T> result = mapper(departmentResults);
            return await result.ToPagedListAsync(pagingParams, cancellationToken);
        }

        public async Task<int> CountDepartmentAsync(CancellationToken cancellationToken = default)
        {
            return await _context.Set<Department>().CountAsync(cancellationToken);
        }
    }
}
