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
                .WithMessage("Họ và tên không được để trống")
                .MaximumLength(1000)
                .WithMessage("Họ và tên chỉ tối đa 1000 ký tự");

            RuleFor(l => l.Qualification)
                .NotEmpty()
                .WithMessage("Trình độ không được để trống")
                .MaximumLength(1000)
                .WithMessage("Trình độ chỉ tối đa 1000 ký tự");

            RuleFor(l => l.DoB)
                .GreaterThan(DateTime.MinValue)
                .WithMessage("Ngày sinh không hợp lệ");

            RuleFor(l => l.DepartmentId)
                .NotEmpty()
                .WithMessage("Khoa không được để trống");
        }
    }
}
