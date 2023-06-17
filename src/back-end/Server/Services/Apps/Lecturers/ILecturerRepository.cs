using Core.Contracts;
using Core.DTO.Lecturer;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Apps.Lecturers
{
    public interface ILecturerRepository
    {
        //Lấy danh sách các giảng viên
        Task<IList<LecturerItem>> GetLecturersAsync(CancellationToken cancellationToken = default);

        Task<Lecturer> GetLecturerByIdAsync(int id, bool includeDetails = false, CancellationToken cancellationToken = default);

        Task<Lecturer> GetLecturerBySlugAsync(string slug, bool includeDetails = false, CancellationToken cancellationToken = default);

        Task<bool> IsLecturerEmailExitedAsync(int id, string email, CancellationToken cancellationToken = default);

        Task<IPagedList<T>> GetPagedLecturesAsync<T>(
            LecturerQuery query,
            IPagingParams pagingParams,
            Func<IQueryable<Lecturer>, IQueryable<T>> mapper,
            CancellationToken cancellationToken = default);

        Task<bool> CreateLecturerAccountAsync(Lecturer lecturer, CancellationToken cancellationToken = default);

        Task<bool> UpdateLecturerAsync(Lecturer lecturer, CancellationToken cancellationToken = default);

        Task<bool> GetLecturerPasswordBySlugAsync(string slug, string password, CancellationToken cancellationToken = default);

        Task<bool> DeleteLecturerByIdAsync(int id, CancellationToken cancellationToken = default);

        Task<bool> SetImageAsync(string slug, string imageUrl, CancellationToken cancellationToken = default);

        Task<int> CountLecturerAsync(CancellationToken cancellationToken = default);
    }
}
