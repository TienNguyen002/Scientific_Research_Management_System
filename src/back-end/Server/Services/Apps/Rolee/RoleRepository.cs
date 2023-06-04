using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.DTO.Roles;
using Core.Contracts;
using Core.DTO.Student;
using Core.Entities;
using Data.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;


namespace Services.Apps.Rolee
{
    public class RoleRepository : IRoleRepository
    {
        private readonly WebDbContext _context;

        public RoleRepository(WebDbContext context)
        {
            _context = context;
            
        }

        public async Task<IList<RoleItems>> GetAllRolesAsync(CancellationToken cancellationToken = default)
        {
            IQueryable<Role> roles = _context.Set<Role>();
            return await roles
                .OrderBy(x => x.Id)
                .Select(x => new RoleItems()
                {
                    Id = x.Id,
                    Name = x.Name,
                    UrlSlug = x.UrlSlug,
                })
                .ToListAsync(cancellationToken);
        }

        //public async Task<IList<Role>> GetAllRolesAsync(
        //    CancellationToken cancellationToken= default)
        //{
        //    var roles = await _context.Roles.ToListAsync(cancellationToken);

        //    return roles;
        //}


    }
}
