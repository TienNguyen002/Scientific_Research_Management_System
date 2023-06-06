using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTO.Topic
{
    public class TopicQuery
    {
        public string Keyword { get; set; }
        public int? DepartmentId { get; set; }
        public string DepartmentSlug { get; set; }
        public string DepartmentName { get; set; }
        public int? LecturerId { get; set; }
        public string LecturerSlug { get; set; }
        public string LecturerName { get; set; }
        public int? StatusId { get; set; }
        public int? ProcessId { get; set; }
        public int? RegistrationMonth { get; set; }
        public int? EndMonth { get; set; }
        public int? RegistrationYear { get; set; }
        public int? EndYear { get; set; }
        public int? StudentNumbers { get; set; }
        public string Price { get; set; }
        public int? Point { get; set; }
        public string Students { get; set; }

        public List<string> GetRegisterStudents()
        {
            return (Students ?? "")
                .Split(new[] {',', ';', '\r', '\n'}, StringSplitOptions.RemoveEmptyEntries)
                .ToList();
        }
    }
}
