using FluentValidation;
using WebApi.Models.Student;

namespace WebApi.Validations.Students
{
    public class TopicValidator : AbstractValidator<StudentEditModel>
    {
        public TopicValidator() 
        {
            RuleFor(x => x.StudentId)
                .NotEmpty()
                .WithMessage("MSSV không được để trống");

            RuleFor(x => x.FullName)
                .NotEmpty()
                .WithMessage("Họ và tên không được để trống")
                .MaximumLength(1000)
                .WithMessage("Họ và tên chỉ tối đa 1000 ký tự");

            RuleFor(x => x.Email)
                .NotEmpty()
                .WithMessage("Email không được để trống")
                .MaximumLength(1000)
                .WithMessage("Email chỉ tối đa 1000 ký tự");

            RuleFor(x => x.DoB)
                .GreaterThan(DateTime.MinValue)
                .WithMessage("Ngày tham gia không hợp lệ");

            RuleFor(x => x.Phone)
                .NotEmpty()
                .WithMessage("SĐT không được để trống")
                .MinimumLength(10)
                .WithMessage("SĐT phải ít nhất 10 số");

            RuleFor(x => x.Class)
                .NotEmpty()
                .WithMessage("Lớp không được để trống")
                .MaximumLength(200)
                .WithMessage("Lớp chỉ tối đa 200 ký tự");

            RuleFor(x => x.Year)
                .NotEmpty()
                .WithMessage("Năm học không được để trống")
                .MaximumLength(100)
                .WithMessage("Năm học chỉ tối đa 100 ký tự");

            RuleFor(x => x.Address)
                .NotEmpty()
                .WithMessage("Địa chỉ không được để trống")
                .MaximumLength(1000)
                .WithMessage("Địa chỉ chỉ tối đa 1000 ký tự");

            RuleFor(x => x.DepartmentId)
                .NotEmpty()
                .WithMessage("Tên khoa không được để trống");

        }
    }
}
