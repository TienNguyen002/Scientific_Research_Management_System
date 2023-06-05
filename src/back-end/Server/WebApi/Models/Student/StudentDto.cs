using WebApi.Models.Others;

namespace WebApi.Models.Student
{
    public class StudentDto
    {
        public int Id { get; set; }
        public string StudentId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string UrlSlug { get; set; }
        public DepartmentDto Department { get; set; }
        public DateTime DoB { get; set; }
        public string Phone { get; set; }
        public string Class { get; set; }
        public string Year { get; set; }
        public string Address { get; set; }
    }
}
