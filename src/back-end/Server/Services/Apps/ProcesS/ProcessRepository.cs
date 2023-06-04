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
using Core.DTO.Process;
using System.Diagnostics;
using Services.Apps.Process;

namespace Services.Apps.ProcesS
{
    public class ProcessRepository : IProcessRepository
    {
        private readonly WebDbContext _context;
        public ProcessRepository(WebDbContext context)
        {
            _context = context;

        }

        
    }
}
