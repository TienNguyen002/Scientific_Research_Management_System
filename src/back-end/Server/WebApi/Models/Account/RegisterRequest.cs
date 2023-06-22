using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace WebApi.Models.Account
{
    public class RegisterRequest
    {

        [DisplayName("Họ và tên")]
        [Required(ErrorMessage = "Họ và tên không được để trống")]
        [MaxLength(500, ErrorMessage = "Họ và tên tối đa 500 ký tự")]
        public string FullName { get; set; }

        [DisplayName("Email")]
        [Required(ErrorMessage = "Email không được để trống")]
        [MaxLength(500, ErrorMessage = "Email tối đa 500 ký tự")]
        public string Email { get; set; }

        [DisplayName("Mật khẩu")]
        [Required]
        public string Password { get; set; }

        [DisplayName("Mật khẩu xác nhận")]
        [Required]
        public string ConfirmPassword { get; set; }

        public static async ValueTask<RegisterRequest> BindAsync(HttpContext context)
        {
            var form = await context.Request.ReadFormAsync();
            return new RegisterRequest()
            {
                FullName = form["FullName"],
                Email = form["Email"],
                Password = form["Password"],
                ConfirmPassword = form["ConfirmPassword"]
            };
        }
    }
}
