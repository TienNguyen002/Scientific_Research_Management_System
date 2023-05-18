using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTO.Lecturer
{
    public class LecturerQuery
    {
        public string Keyword { get; set; }
        public int? DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public string DepartmentSlug { get; set; }
    }
}
