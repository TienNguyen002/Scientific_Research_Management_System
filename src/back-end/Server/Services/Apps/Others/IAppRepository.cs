using Core.DTO.Others;
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
        #endregion

        #region Process
        Task<IList<ProcessItem>> GetProcessAsync(CancellationToken cancellationToken = default);
        #endregion
    }
}
