using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Department
{
    public class DepartmentEditModel
    {
        public int Id { get; set; }

        [DisplayName("Tên khoa")]
        [Required(ErrorMessage = "Tên khoa không được bỏ trống")]
        [MaxLength(500, ErrorMessage = "Tên khoa tối đa 500 ký tự")]
        public string Name { get; set; }
        
        public static async ValueTask<DepartmentEditModel> BindAsync(HttpContext context)
        {
            var form = await context.Request.ReadFormAsync();
            return new DepartmentEditModel()
            {
                Id = int.Parse(form["Id"]),
                Name = form["Name"],
            };
        }
    }
}
