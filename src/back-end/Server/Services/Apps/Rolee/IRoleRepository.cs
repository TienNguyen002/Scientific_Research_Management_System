using Core.DTO.Roles;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Apps.Rolee
{
    public interface IRoleRepository
    {
        //Task<IList<Role>> GetAllRolesAsync(
        //    CancellationToken cancellationToken = default);

        Task<IList<RoleItems>> GetAllRolesAsync(
            CancellationToken cancellationToken = default);

    }
}
