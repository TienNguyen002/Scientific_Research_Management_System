using Microsoft.AspNetCore.Mvc.Rendering;
using System.Globalization;

namespace WebApi.Models.Feedback
{
    public class FeedbackFilterModel : PagingModel
    {
        public string Keyword { get; set; }
        public int? CreateMonth { get; set; }
        public int? CreateYear { get; set; }

        public IEnumerable<SelectListItem> MonthList { get; set; }

        public FeedbackFilterModel()
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
