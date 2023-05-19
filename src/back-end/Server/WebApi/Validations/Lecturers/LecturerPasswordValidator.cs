using FluentValidation;
using WebApi.Models.Lecturer.Account;

namespace WebApi.Validations.Lecturers
{
    public class LecturerPasswordValidator : AbstractValidator<LecturerPassword>
    {
        public LecturerPasswordValidator()
        {
            RuleFor(l => l.NewPassword)
                .NotEmpty()
                .WithMessage("Password không được để trống")
                .MaximumLength(1000)
                .WithMessage("Password chỉ tối đa 1000 ký tự");

            RuleFor(l => l.Password)
                .NotEmpty()
                .WithMessage("Password không được để trống")
                .MaximumLength(1000)
                .WithMessage("Password chỉ tối đa 1000 ký tự");

            RuleFor(l => l.ConfirmPassword)
                .NotEmpty()
                .WithMessage("Password không được để trống")
                .MaximumLength(1000)
                .WithMessage("Password chỉ tối đa 1000 ký tự");
        }
    }
}
