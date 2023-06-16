using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Topic
{
    public class TopicAddLecturer
    {
        public int Id { get; set; }

        [DisplayName("Giảng viên")]
        [Required]        
        public int LecturerId { get; set; }

        public IEnumerable<SelectListItem> LecturerList { get; set; }

        public static async ValueTask<TopicAddLecturer> BindAsync(HttpContext context)
        {
            var form = await context.Request.ReadFormAsync();
            return new TopicAddLecturer()
            {
                Id = int.Parse(form["Id"]),
                LecturerId = int.Parse(form["LecturerId"])
            };
        }
    }
}
