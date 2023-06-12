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
                .WithMessage("Mật khẩu mới không được để trống")
                .MaximumLength(1000)
                .WithMessage("Mật khẩu mới chỉ tối đa 1000 ký tự");

            RuleFor(l => l.Password)
                .NotEmpty()
                .WithMessage("Mật khẩu cũ không được để trống")
                .MaximumLength(1000)
                .WithMessage("Mật khẩu cũ chỉ tối đa 1000 ký tự");

            RuleFor(l => l.ConfirmPassword)
                .NotEmpty()
                .WithMessage("Mật khẩu xác nhận không được để trống")
                .MaximumLength(1000)
                .WithMessage("Mật khẩu xác nhận chỉ tối đa 1000 ký tự");
        }
    }
}
