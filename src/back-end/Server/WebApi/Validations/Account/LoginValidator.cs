using FluentValidation;
using WebApi.Models.Account;

namespace WebApi.Validations.Account
{
    public class LoginValidator : AbstractValidator<LoginRequest>
    {
        public LoginValidator()
        {
            RuleFor(l => l.Email)
                .NotEmpty()
                .WithMessage("Email không được để trống")
                .MaximumLength(1000)
                .WithMessage("Email chỉ tối đa 1000 ký tự");

            RuleFor(l => l.Password)
                .NotEmpty()
                .WithMessage("Mật khẩu không được để trống")
                .MaximumLength(1000)
                .WithMessage("Mật khẩu chỉ tối đa 1000 ký tự");
        }
    }
}
