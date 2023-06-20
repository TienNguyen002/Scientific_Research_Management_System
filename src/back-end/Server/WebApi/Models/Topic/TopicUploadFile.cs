using System.ComponentModel;

namespace WebApi.Models.Topic
{
    public class TopicUploadFile
    {
        public string UrlSlug { get; set; }

        [DisplayName("Chọn file thuyết minh")]
        public IFormFile OutlineFile { get; set; }

        [DisplayName("File thuyết minh")]
        public string OutlineUrl { get; set; }

        [DisplayName("Chọn file thuyết minh")]
        public IFormFile ResultFile { get; set; }

        [DisplayName("File thuyết minh")]
        public string ResultUrl { get; set; }

        public static async ValueTask<TopicUploadFile> BindAsync(HttpContext context)
        {
            var form = await context.Request.ReadFormAsync();
            return new TopicUploadFile()
            {
                OutlineFile = form.Files["OutlineFile"],
                ResultFile = form.Files["ResultFile"],
                UrlSlug = form["UrlSlug"],
            };
        }
    }
}
