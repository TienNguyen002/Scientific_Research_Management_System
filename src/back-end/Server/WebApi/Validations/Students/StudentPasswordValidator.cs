using FluentValidation;
using WebApi.Models.Student.Account;

namespace WebApi.Validations.Students
{
    public class StudentPasswordValidator : AbstractValidator<StudentPassword>
    {
        public StudentPasswordValidator() 
        {
            RuleFor(x => x.NewPassword)
                .NotEmpty()
                .WithMessage("Password không được để trống")
                .MaximumLength(1000)
                .WithMessage("Password chỉ tối đa 1000 ký tự");

            RuleFor(x => x.Password)
                .NotEmpty()
                .WithMessage("Password không được để trống")
                .MaximumLength(1000)
                .WithMessage("Password chỉ tối đa 1000 ký tự");

            RuleFor(x => x.ConfirmPassword)
                .NotEmpty()
                .WithMessage("Password không được để trống")
                .MaximumLength(1000)
                .WithMessage("Password chỉ tối đa 1000 ký tự");
        }
    }
}
