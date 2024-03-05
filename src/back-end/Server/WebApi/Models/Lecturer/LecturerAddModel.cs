using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Lecturer
{
    public class LecturerAddModel
    {
        [DisplayName("Họ và tên")]
        public string FullName { get; set; }

        [DisplayName("Email")]
        public string Email { get; set; }

        [DisplayName("Mật khẩu")]
        public string Password { get; set; }

        [DisplayName("Khoa")]
        [Required]
        public int DepartmentId { get; set; }

        public IEnumerable<SelectListItem> DepartmentList { get; set; }

        public static async ValueTask<LecturerAddModel> BindAsync(HttpContext context)
        {
            var form = await context.Request.ReadFormAsync();
            return new LecturerAddModel()
            {
                FullName = form["FullName"],
                Email = form["Email"],
                Password = form["Password"],
                DepartmentId = int.Parse(form["DepartmentId"])
            };
        }
    }
}
