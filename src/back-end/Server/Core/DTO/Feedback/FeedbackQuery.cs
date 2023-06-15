using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTO.Feedback
{
    public class FeedbackQuery
    {
        public string Keyword { get; set; }
        public int? CreateMonth { get; set; }
        public int? CreateYear { get; set; }
    }
}
