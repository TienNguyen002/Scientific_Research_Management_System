using WebApi.Models.Department;

namespace WebApi.Models.Lecturer
{
    public class LecturerDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string UrlSlug { get; set; }
        public string Qualification { get; set; }
        public DateTime DoB { get; set; }
        public string ImageUrl { get; set; }
        public DepartmentDto Department { get; set; }
    }
}
