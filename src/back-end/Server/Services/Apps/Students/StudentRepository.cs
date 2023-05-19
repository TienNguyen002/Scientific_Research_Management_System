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
            IQueryable<Student> students = _context.Set<Student>();
            return await students
                .OrderBy(x => x.StudentId)
                .Select(x => new StudentItem()
                {
                    Id = x.Id,
                    StudentId = x.StudentId,
                    FullName = x.FullName,
                    Email = x.Email,
                    UrlSlug = x.UrlSlug,
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
            IQueryable<Student> StudentQuery = _context.Set<Student>()
                .Include(x => x.Department);
            if (!string.IsNullOrEmpty(query.Keyword))
            {
                StudentQuery = StudentQuery.Where(x => x.FullName.Contains(query.Keyword)
                || x.Email.Contains(query.Keyword)
                || x.UrlSlug.Contains(query.Keyword));
            }
            if (query.DepartmentId > 0)
            {
                StudentQuery = StudentQuery.Where(x => x.DepartmentId == query.DepartmentId);
            }
            return StudentQuery;
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
                .Include(x => x.Group)
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

        public async Task<Student> GetStudentBySlugAsync(string slug, CancellationToken cancellationToken = default)
        {
            return await _context.Set<Student>()
                .Where(x => x.UrlSlug.Contains(slug))
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<bool> UpdateStudentAsync(Student student, CancellationToken cancellationToken = default)
        {
            student.UrlSlug = SlugHelper.GenerateSlug(student.FullName);
            _context.Update(student);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<Student> GetStudentByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            return await _context.Set<Student>().FindAsync(id, cancellationToken);
        }

        public async Task<bool> IsStudentEmailExitedAsync(int id, string email, CancellationToken cancellationToken = default)
        {
            return await _context.Set<Student>()
                .AnyAsync(x => x.Id != id && x.Email == email, cancellationToken);
        }

        public async Task<bool> CreateStudentAccountAsync(Student student, CancellationToken cancellationToken = default)
        {
            student.UrlSlug = SlugHelper.GenerateSlug(student.FullName);
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
