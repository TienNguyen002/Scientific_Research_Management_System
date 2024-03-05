using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTO.Topic
{
    public class TopicItem
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string UrlSlug { get; set; }
        public string Description { get; set; }
        public string Department { get; set; }
        public string Lecturer { get; set; }
        public string Students { get; set; }
        public string Status { get; set; }
    }
}
