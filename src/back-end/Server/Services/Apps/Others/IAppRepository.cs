using Core.Contracts;
using Core.DTO.Others;
using Core.DTO.Roles;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Apps.Others
{
    public interface IAppRepository
    {
        #region Status
        Task<IList<StatusItem>> GetStatusAsync(CancellationToken cancellationToken = default);

        Task<Status> GetStatusByIdAsync(int id, CancellationToken cancellationToken = default);
        #endregion

        #region Role
        Task<IList<RoleItems>> GetAllRolesAsync(
            CancellationToken cancellationToken = default);
        #endregion
    }
}
