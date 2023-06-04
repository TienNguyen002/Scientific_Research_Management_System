using Core.Entities;
using WebApi.Models.Lecturer;
using WebApi.Models.Others;
using WebApi.Models.Student;

namespace WebApi.Models.Topic
{
    public class TopicDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string UrlSlug { get; set; }
        public string Description { get; set; }
        public string Note { get; set; }
        public DateTime RegistrationDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int StudentNumbers { get; set; }
        public string Price { get; set; }
        public string OutlineUrl { get; set; }
        public string ResultUrl { get; set; }
        public int Point { get; set; }
        public DepartmentDto Department { get; set; }
        public LecturerDto Lecturer { get; set; }
        public IList<StudentDto> Students { get; set; }
        public StatusDto Status { get; set; }
        public ProcessDto Process { get; set; }
    }
}
