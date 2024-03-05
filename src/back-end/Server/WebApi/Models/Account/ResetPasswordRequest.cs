using System.ComponentModel;

namespace WebApi.Models.Account
{
    public class ResetPasswordRequest
    {
        public string UrlSlug { get; set; }

        [DisplayName("Mật khẩu cũ")]
        public string Password { get; set; }

        [DisplayName("Mật khẩu mới")]
        public string NewPassword { get; set; }

        [DisplayName("Mật khẩu xác nhận")]
        public string ConfirmPassword { get; set; }

        public static async ValueTask<ResetPasswordRequest> BindAsync(HttpContext context)
        {
            var form = await context.Request.ReadFormAsync();
            return new ResetPasswordRequest()
            {
                UrlSlug = form["UrlSlug"],
                Password = form["Password"],
                NewPassword = form["NewPassword"],
                ConfirmPassword = form["ConfirmPassword"],
            };
        }
    }
}
