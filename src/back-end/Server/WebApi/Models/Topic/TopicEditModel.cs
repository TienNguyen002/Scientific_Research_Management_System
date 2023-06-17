using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Topic
{
    public class TopicEditModel
    {
        public int Id { get; set; }

        [DisplayName("Tên đề tài")]
        [Required(ErrorMessage ="Tên đề tài không được để trống")]
        [MaxLength(500, ErrorMessage ="Tên đề tài tối đa 500 ký tự")]
        public string Title { get; set; }

        [DisplayName("Mô tả")]
        [Required]
        public string Description { get; set; }

        [DisplayName("Ghi chú")]
        public string Note { get; set; }

        [DisplayName("Ngày nghiệm thu")]
        [Required]
        public DateTime EndDate { get; set; }

        [DisplayName("Số sinh viên thực hiện")]
        [Required]
        public int StudentNumbers { get; set; }

        [DisplayName("Kinh phí")]
        public int Price { get; set; }

        [DisplayName("Khoa")]
        [Required]
        public int DepartmentId { get; set; }

        [DisplayName("Trạng thái")]
        [Required]
        public int StatusId { get; set; }

        public IEnumerable<SelectListItem> DepartmentList { get; set; }
        public IEnumerable<SelectListItem> StatusList { get; set; }

        public static async ValueTask<TopicEditModel> BindAsync(HttpContext context)
        {
            var form = await context.Request.ReadFormAsync();
            return new TopicEditModel()
            {
                Id = int.Parse(form["Id"]),
                Title = form["Title"],
                Description = form["Description"],
                Note = form["Note"],
                EndDate = DateTime.Parse(form["EndDate"]),
                StudentNumbers = int.Parse(form["StudentNumbers"]),
                Price = int.Parse(form["Price"]),
                DepartmentId = int.Parse(form["DepartmentId"]),
                StatusId = int.Parse(form["StatusId"])
            };
        }
    }
}
