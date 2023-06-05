using Core.DTO.Department;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Apps.Departments
{
    public interface IDepartmentRepository
    {
        Task<IList<DepartmentItems>> GetAllDepartmentAsync(CancellationToken cancellationToken = default);

        Task<bool> IsDepartmentExistBySlugAsync(
            int id,
            string slug,
            CancellationToken cancellationToken = default);

        Task<bool> AddOrUpdateDepartmentAsync(Department depart, CancellationToken cancellationToken = default);

        Task<bool> DeleteDepartmentByIdAsync(int id, CancellationToken cancellationToken = default);

    }
}
