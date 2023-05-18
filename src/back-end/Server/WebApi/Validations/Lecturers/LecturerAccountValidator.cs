using FluentValidation;
using WebApi.Models.Lecturer;

namespace WebApi.Validations.Lecturers
{
    public class LecturerAccountValidator : AbstractValidator<LecturerCreateAccount>
    {
        public LecturerAccountValidator()
        {
            RuleFor(l => l.Email)
                .NotEmpty()
                .WithMessage("Email không được để trống")
                .MaximumLength(1000)
                .WithMessage("Email chỉ tối đa 1000 ký tự");

            RuleFor(l => l.Password)
                .NotEmpty()
                .WithMessage("Password không được để trống")
                .MaximumLength(1000)
                .WithMessage("Password chỉ tối đa 1000 ký tự");

            RuleFor(l => l.ConfirmPassword)
                .NotEmpty()
                .WithMessage("ConfirmPassword không được để trống")
                .MaximumLength(1000)
                .WithMessage("ConfirmPassword chỉ tối đa 1000 ký tự");

            RuleFor(l => l.FullName)
                .NotEmpty()
                .WithMessage("FullName không được để trống")
                .MaximumLength(1000)
                .WithMessage("FullName chỉ tối đa 1000 ký tự");
        }
    }
}
