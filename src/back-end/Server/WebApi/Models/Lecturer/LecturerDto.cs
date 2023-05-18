namespace WebApi.Models.Lecturer
{
    public class LecturerDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string UrlSlug { get; set; }
        public string Qualification { get; set; }
        public DateTime DoB { get; set; }
    }
}
