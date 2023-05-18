namespace WebApi.Models.Lecturer
{
    public class LecturerEditModel
    {
        public string FullName { get; set; }
        public string UrlSlug { get; set; }
        public string Qualification { get; set; }
        public DateTime DoB { get; set; }
        public int DepartmentId { get; set; }
        public int RoleId { get; set; }
    }
}
