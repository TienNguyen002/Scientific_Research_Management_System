using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel;

namespace WebApi.Models.Lecturer
{
    public class LecturerFilterModel : PagingModel
    {
        [DisplayName("Từ khóa")]
        public string Keyword { get; set; }

        [DisplayName("Khoa")]
        public int? DepartmentId { get; set; }
        public string DepartmentSlug { get; set; }

        public IEnumerable<SelectListItem> DepartmentList { get; set; }
    }
}
