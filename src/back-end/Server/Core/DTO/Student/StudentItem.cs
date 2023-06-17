using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTO.Student
{
    public class StudentItem
    {
        public int Id { get; set; }
        public string StudentId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string UrlSlug { get; set; }
        public string Department { get; set; }
        public DateTime DoB { get; set; }
        public string Phone { get; set; }
        public string Class { get; set; }
        public string Year { get; set; }
        public string Address { get; set; }
    }
}
