using FluentValidation;
using WebApi.Models.Student.Account;

namespace WebApi.Validations.Students
{
    public class StudentAccountValidator : AbstractValidator<StudentCreateccount>
    {
        public StudentAccountValidator() 
        {
            RuleFor(x => x.Email)
                .NotEmpty()
                .WithMessage("Email không được để trống")
                .MaximumLength(1000)
                .WithMessage("Email chỉ tối đa 1000 ký tự");

            RuleFor(x => x.Password)
                .NotEmpty()
                .WithMessage("Mật khẩu không được để trống")
                .MaximumLength(1000)
                .WithMessage("Mật khẩu chỉ tối đa 1000 ký tự");

            RuleFor(x => x.ConfirmPassword)
                .NotEmpty()
                .WithMessage("Mật khẩu xác nhận không được để trống")
                .MaximumLength(1000)
                .WithMessage("Mật khẩu xác nhận chỉ tối đa 1000 ký tự");

            RuleFor(x => x.FullName)
                .NotEmpty()
                .WithMessage("Họ và tên không được để trống")
                .MaximumLength(1000)
                .WithMessage("Họ và tên chỉ tối đa 1000 ký tự");
        }
    }
}
