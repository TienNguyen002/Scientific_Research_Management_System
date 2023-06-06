using Core.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Topic : IEntity
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string UrlSlug { get; set; }
        public string Description { get; set; }
        public string Note { get; set; }
        public DateTime RegistrationDate { get; set; }
        public DateTime EndDate { get; set; }
        public int StudentNumbers { get; set; }
        public string Price { get; set; }
        public string OutlineUrl { get; set; }
        public string ResultUrl { get; set; }
        public int ViewCount { get; set; }
        public int Point { get; set; }
        public int DepartmentId { get; set; }
        public Department Department { get; set; }
        public IList<Student> Students { get; set; }
        public int? LecturerId { get; set; }
        public Lecturer Lecturer { get; set; }
        public int StatusId { get; set; }
        public Status Status { get; set; }
    }
}
