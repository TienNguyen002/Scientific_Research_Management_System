using Azure;
using Core.DTO.Department;
using Core.Entities;
using Data.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
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
                _context.Set<Department>().Update(depart);
                _memoryCache.Remove($"tag.by-id.{depart.Id}");   
            }
            else
            {
                _context.Set<Department>().Add(depart);
            }
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<bool> DeleteDepartmentByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            var depart = _context.Set<Department>().FirstOrDefault(t => t.Id == id);
            if (depart != null)
            {
                _context.Departments.Remove(depart);
                await _context.SaveChangesAsync(cancellationToken);
                return true;
            }
            return false;
        }
    }
}
