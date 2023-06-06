using Microsoft.AspNetCore.Mvc.Rendering;
using System.Globalization;

namespace WebApi.Models.Topic
{
    public class TopicFilterModel : PagingModel
    {
        public string Keyword { get; set; }
        public int? DepartmentId { get; set; }
        public string DepartmentSlug { get; set; }
        public int? LecturerId { get; set; }
        public string LecturerSlug { get; set; }
        public int? StatusId { get; set; }
        public int? ProcessId { get; set; }
        public int? RegistrationMonth { get; set; }
        public int? RegistrationYear { get; set; }
        public int? StudentNumbers { get; set; }
        public string Price { get; set; }
        public int? Point { get; set; }
        public string Students { get; set; }

        public IEnumerable<SelectListItem> DepartmentList { get; set; }
        public IEnumerable<SelectListItem> LecturerList { get; set; }
        public IEnumerable<SelectListItem> StatusList { get; set; }
        public IEnumerable<SelectListItem> MonthList { get; set; }

        public TopicFilterModel()
        {
            CultureInfo.CurrentCulture = new CultureInfo("vi-VN");
            MonthList = Enumerable.Range(1, 12)
            .Select(m => new SelectListItem()
            {
                Value = m.ToString(),
                Text = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(m)
            })
            .ToList();
        }
    }
}
