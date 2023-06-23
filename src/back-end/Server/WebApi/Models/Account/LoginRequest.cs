using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace WebApi.Models.Account
{
    public class LoginRequest
    {
        [DisplayName("Email")]
        [Required(ErrorMessage = "Email không được để trống")]
        [MaxLength(500, ErrorMessage = "Email tối đa 500 ký tự")]
        public string Email { get; set; }

        [DisplayName("Mật khẩu")]
        [Required]
        public string Password { get; set; }

        public static async ValueTask<LoginRequest> BindAsync(HttpContext context)
        {
            var form = await context.Request.ReadFormAsync();
            return new LoginRequest()
            {
                Email = form["Email"],
                Password = form["Password"],
            };
        }
    }
}
