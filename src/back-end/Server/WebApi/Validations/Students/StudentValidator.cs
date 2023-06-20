using FluentValidation;
using WebApi.Models.Student;

namespace WebApi.Validations.Students
{
    public class TopicValidator : AbstractValidator<StudentEditModel>
    {
        public TopicValidator() 
        {

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

            RuleFor(x => x.Address)
                .NotEmpty()
                .WithMessage("Địa chỉ không được để trống")
                .MaximumLength(1000)
                .WithMessage("Địa chỉ chỉ tối đa 1000 ký tự");

        }
    }
}
