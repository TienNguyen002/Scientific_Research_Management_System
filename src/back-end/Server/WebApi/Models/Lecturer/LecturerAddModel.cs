using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Lecturer
{
    public class LecturerAddModel
    {
        public int Id { get; set;}

        [DisplayName("Họ và tên")]
        [Required]
        public string FullName { get; set; }

        [DisplayName("Email")]
        [Required]
        public string Email { get; set; }

        [DisplayName("Password")]
        [Required]
        public string Password { get; set; }

         public static async ValueTask<LecturerAddModel> BindAsync(HttpContext context)
        {
            var form = await context.Request.ReadFormAsync();
            return new LecturerAddModel()
            {
                Id = int.Parse(form["Id"]),
                FullName = form["FullName"],
                Email = form["Email"],
                Password = form["Password"]
            };
        }
    }
}
