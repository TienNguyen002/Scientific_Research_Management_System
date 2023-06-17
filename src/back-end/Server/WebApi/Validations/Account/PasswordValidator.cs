using FluentValidation;
using WebApi.Models.Account;

namespace WebApi.Validations.Account
{
    public class PasswordValidator : AbstractValidator<PasswordRequest>
    {
        public PasswordValidator()
        {
            RuleFor(x => x.NewPassword)
                .NotEmpty()
                .WithMessage("Mật khẩu mới không được để trống")
                .MaximumLength(1000)
                .WithMessage("Mật khẩu mới chỉ tối đa 1000 ký tự");

            RuleFor(x => x.Password)
                .NotEmpty()
                .WithMessage("Mật khẩu cũ không được để trống")
                .MaximumLength(1000)
                .WithMessage("Mật khẩu cũ chỉ tối đa 1000 ký tự");

            RuleFor(x => x.ConfirmPassword)
                .NotEmpty()
                .WithMessage("Mật khẩu xác nhận không được để trống")
                .MaximumLength(1000)
                .WithMessage("Mật khẩu xác nhận chỉ tối đa 1000 ký tự");
        }
    }
}
