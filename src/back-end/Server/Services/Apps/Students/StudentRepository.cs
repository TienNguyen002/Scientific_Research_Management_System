using Data.Contexts;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.DTO.Student;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Core.Contracts;
using Services.Extensions;
using Services.Helper;
using SlugGenerator;

namespace Services.Apps.Students
{
     public class StudentRepository : IStudentRepository
    {
        private readonly WebDbContext _context;
        private readonly IMemoryCache _memoryCache;
        public StudentRepository(WebDbContext context, IMemoryCache memoryCache)
        {
            _context = context;
            _memoryCache = memoryCache;
        }

        public async Task<IList<StudentItem>> GetStudentsAsync(CancellationToken cancellationToken = default)
        {
            IQueryable<Student> students = _context.Set<Student>()
                .Include(s => s.Department);
            return await students
                .OrderBy(x => x.StudentId)
                .Select(x => new StudentItem()
                {
                    Id = x.Id,
                    StudentId = x.StudentId,
                    FullName = x.FullName,
                    Email = x.Email,
                    UrlSlug = x.UrlSlug,
                    Department = x.Department.Name,
                    DoB = x.DoB,
                    Phone = x.Phone,
                    Class = x.Class,
                    Year = x.Year,
                    Address = x.Address,
                })
                .ToListAsync(cancellationToken);
        }

        private IQueryable<Student> GetStudentByQueryable(StudentQuery query)
        {
            IQueryable<Student> studentQuery = _context.Set<Student>()
                .Include(x => x.Department);
            if (!string.IsNullOrEmpty(query.Keyword))
            {
                studentQuery = studentQuery.Where(x => x.FullName.Contains(query.Keyword)
                || x.Email.Contains(query.Keyword)
                || x.UrlSlug.Contains(query.Keyword)
                || x.Class.Contains(query.Keyword)
                || x.Year.Contains(query.Keyword));
            }
            if (query.DepartmentId > 0)
            {
                studentQuery = studentQuery.Where(x => x.DepartmentId == query.DepartmentId);
            }
            if (!string.IsNullOrWhiteSpace(query.DepartmentSlug))
            {
                studentQuery = studentQuery.Where(x => x.Department.UrlSlug.Contains(query.DepartmentSlug));
            }
            return studentQuery;
        }
        public async Task<IPagedList<T>> GetPagedStudentAsync<T>(StudentQuery query,
            IPagingParams pagingParams,
            Func<IQueryable<Student>, IQueryable<T>> mapper,
            CancellationToken cancellationToken = default)
        {
            IQueryable<Student> StudentFindResultsQuery = GetStudentByQueryable(query);
            IQueryable<T> result = mapper(StudentFindResultsQuery);
            return await result.ToPagedListAsync(pagingParams, cancellationToken);
        }

        public async Task<bool> DeleteStudentByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            var StudentNToDelete = await _context.Set<Student>()
                .Include(x => x.Department)
                .Include(x => x.Role)
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync(cancellationToken);
            if (StudentNToDelete == null)
            {
                return false;
            }
            _context.Remove(StudentNToDelete);
            await _context.SaveChangesAsync(cancellationToken);
            return true;
        }

        public async Task<Student> GetStudentBySlugAsync(string slug, bool includeDetails = false, CancellationToken cancellationToken = default)
        {
            if (!includeDetails)
            {
                return await _context.Set<Student>().Where(p => p.UrlSlug == slug)
                    .FirstOrDefaultAsync(cancellationToken);
            }
            return await _context.Set<Student>()
                .Include(x => x.Department)
                .Where(x => x.UrlSlug == slug)
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<bool> UpdateStudentAsync(Student student, CancellationToken cancellationToken = default)
        {
            student.UrlSlug = student.FullName.GenerateSlug();
            _context.Update(student);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<Student> GetStudentByIdAsync(int id, bool includeDetails = false, CancellationToken cancellationToken = default)
        {
            if (!includeDetails)
            {
                return await _context.Set<Student>().FindAsync(id);
            }
            return await _context.Set<Student>()
                .Include(x => x.Department)
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<bool> IsStudentEmailExitedAsync(int id, string email, CancellationToken cancellationToken = default)
        {
            return await _context.Set<Student>()
                .AnyAsync(x => x.Id != id && x.Email == email, cancellationToken);
        }

        public async Task<bool> IsStudentExistByFullNameAsync(
            int id,
            string fullName,
            CancellationToken cancellationToken = default)
        {
            return await _context.Set<Student>()
                .AnyAsync(c => c.Id == id && c.FullName == fullName, cancellationToken);
        }

        public async Task<bool> CreateStudentAccountAsync(Student student, CancellationToken cancellationToken = default)
        {
            student.UrlSlug = student.FullName.GenerateSlug();
            _context.Add(student);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<bool> GetStudentPasswordBySlugAsync(string slug, string password, CancellationToken cancellationToken = default)
        {
            return await _context.Set<Student>()
                .AnyAsync(x => x.UrlSlug == slug && x.Password != password, cancellationToken);
        }
    }
}
