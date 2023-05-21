namespace WebApi.Models.Student
{
    public class StudentEditModel
    {
        public string StudentId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string UrlSlug { get; set; }
        public DateTime DoB { get; set; }
        public string Phone { get; set; }
        public string Class { get; set; }
        public string Year { get; set; }
        public string Address { get; set; }
        public int DepartmentId { get; set; }
        public int GroupId { get; set; }
        public int RoleId { get; set; }
    }
}
