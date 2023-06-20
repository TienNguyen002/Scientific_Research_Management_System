using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Student
{
    public class StudentEditModel
    {
        public string UrlSlug { get; set; }

        [DisplayName("Chọn hình ảnh")]
        public IFormFile ImageFile { get; set; }

        [DisplayName("Hình hiện tại")]
        public string ImageUrl { get; set; }

        [DisplayName("Email")]
        public string Email { get; set; }

        [DisplayName("Ngày tháng năm sinh")]
        public DateTime DoB { get; set; }

        [DisplayName("Số điện thoại")]
        public string Phone { get; set; }

        [DisplayName("Địa chỉ")]
        public string Address { get; set; }

        public static async ValueTask<StudentEditModel> BindAsync(HttpContext context)
        {
            var form = await context.Request.ReadFormAsync();
            return new StudentEditModel()
            {
                ImageFile = form.Files["ImageFile"],
                UrlSlug = form["UrlSlug"],
                Email = form["Email"],
                DoB = DateTime.Parse(form["DoB"]),
                Phone = form["Phone"],
                Address = form["Address"],
            };
        }
    }
}
