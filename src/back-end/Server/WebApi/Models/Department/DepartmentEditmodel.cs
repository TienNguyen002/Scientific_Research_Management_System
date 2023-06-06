using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Department
{
    public class DepartmentEditModel
    {
        public string Name { get; set; }
        public string UrlSlug { get; set; }
        
    }
}
