using Core.DTO.Others;
using Core.Entities;
using Data.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Apps.Others
{
    public class AppRepository : IAppRepository
    {
        private readonly WebDbContext _context;
        private readonly IMemoryCache _memoryCache;
        public AppRepository(WebDbContext context, IMemoryCache memoryCache)
        {
            _context = context;
            _memoryCache = memoryCache;
        }

        #region Status
        public async Task<IList<StatusItem>> GetStatusAsync(CancellationToken cancellationToken = default)
        {
            IQueryable<Status> status = _context.Set<Status>();
            return await status
                .OrderBy(s => s.Name)
                .Select(s => new StatusItem()
                {
                    Id = s.Id,
                    Name = s.Name,
                    UrlSlug = s.UrlSlug,
                })
                .ToListAsync(cancellationToken);
        }
        #endregion
    }
}
