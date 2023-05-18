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
                .WithMessage("Password không được để trống")
                .MaximumLength(1000)
                .WithMessage("Password chỉ tối đa 1000 ký tự");
            RuleFor(x => x.ConfirmPassword)
                .NotEmpty()
                .WithMessage("ConfirmPassword không được để trống")
                .MaximumLength(1000)
                .WithMessage("ConfirmPassword chỉ tối đa 1000 ký tự");
            RuleFor(x => x.FullName)
                .NotEmpty()
                .WithMessage("FullName không được để trống")
                .MaximumLength(1000)
                .WithMessage("FullName chỉ tối đa 1000 ký tự");
        }
    }
}
