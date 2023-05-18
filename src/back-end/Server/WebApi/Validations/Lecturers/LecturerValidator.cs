using FluentValidation;
using WebApi.Models.Lecturer;

namespace WebApi.Validations.Lecturers
{
    public class LecturerValidator : AbstractValidator<LecturerEditModel>
    {
        public LecturerValidator() 
        {
            RuleFor(l => l.FullName)
                .NotEmpty()
                .WithMessage("FullName không được để trống")
                .MaximumLength(1000)
                .WithMessage("FullName chỉ tối đa 1000 ký tự");

            RuleFor(l => l.UrlSlug)
                .MaximumLength(1000)
                .WithMessage("FullName chỉ tối đa 1000 ký tự");

            RuleFor(l => l.Qualification)
                .NotEmpty()
                .WithMessage("FullName không được để trống")
                .MaximumLength(1000)
                .WithMessage("FullName chỉ tối đa 1000 ký tự");

            RuleFor(l => l.DoB)
                .GreaterThan(DateTime.MinValue)
                .WithMessage("Ngày tham gia không hợp lệ");

            RuleFor(l => l.DepartmentId)
                .NotEmpty()
                .WithMessage("FullName không được để trống");

            RuleFor(l => l.RoleId)
                .NotEmpty()
                .WithMessage("FullName không được để trống");
        }
    }
}
