using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Lecturer
{
    public class LecturerEditModel
    {
        public int Id { get; set; }

        [DisplayName("Họ và tên")]
        [Required]
        public string FullName { get; set; }

        [DisplayName("Email")]
        [Required]
        public string Email { get; set; }

        [DisplayName("Password")]
        [Required]
        public string Password { get; set; }

        [DisplayName("Trình độ học vấn")]
        public string Qualification { get; set; }

        [DisplayName("Ngày tháng năm sinh")]
        public DateTime DoB { get; set; }

        [DisplayName("Khoa")]
        [Required]
        public int DepartmentId { get; set; }

        public IEnumerable<SelectListItem> DepartmentList { get; set; }

        public static async ValueTask<LecturerEditModel> BindAsync(HttpContext context)
        {
            var form = await context.Request.ReadFormAsync();
            return new LecturerEditModel()
            {
                Id = int.Parse(form["Id"]),
                FullName = form["FullName"],
                Email = form["Email"],
                Password = form["Password"],
                Qualification = form["Qualification"],
                DoB = DateTime.Parse(form["DoB"]),
                DepartmentId = int.Parse(form["DepartmentId"])
            };
        }
    }
}
