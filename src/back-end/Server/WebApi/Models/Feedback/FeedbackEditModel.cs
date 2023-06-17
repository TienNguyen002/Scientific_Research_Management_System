using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using WebApi.Models.Topic;

namespace WebApi.Models.Feedback
{
    public class FeedbackEditModel
    {
        public int Id { get; set; }

        [DisplayName("Tên người dùng")]
        [Required(ErrorMessage = "Tên người dùng không được để trống")]
        public string Username { get; set; }

        [DisplayName("Nội dung")]
        [Required(ErrorMessage = "Nội dung không được để trống")]
        public string Content { get; set; }

        public static async ValueTask<FeedbackEditModel> BindAsync(HttpContext context)
        {
            var form = await context.Request.ReadFormAsync();
            return new FeedbackEditModel()
            {
                Id = int.Parse(form["Id"]),
                Username = form["Username"],
                Content = form["Content"],
            };
        }
    }
}
