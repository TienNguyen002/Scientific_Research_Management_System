using FluentValidation;
using WebApi.Models.Student;

namespace WebApi.Validations.Students
{
    public class StudentValidator : AbstractValidator<StudentEditModel>
    {
        public StudentValidator() 
        {
            RuleFor(x => x.StudentId)
                .NotEmpty()
                .WithMessage("StudentID không được để trống");

            RuleFor(x => x.FullName)
                .NotEmpty()
                .WithMessage("FullName không được để trống")
                .MaximumLength(1000)
                .WithMessage("FullName chỉ tối đa 1000 ký tự");

            RuleFor(x => x.Email)
                .NotEmpty()
                .WithMessage("Email không được để trống")
                .MaximumLength(1000)
                .WithMessage("Email chỉ tối đa 1000 ký tự");

            RuleFor(x => x.UrlSlug)
                .NotEmpty()
                .WithMessage("UrlSlug không được để trống")
                .MaximumLength(1000)
                .WithMessage("UrlSlug chỉ tối đa 1000 ký tự");

            RuleFor(x => x.DoB)
                .GreaterThan(DateTime.MinValue)
                .WithMessage("Ngày tham gia không hợp lệ");

            RuleFor(x => x.Phone)
                .NotEmpty()
                .WithMessage("Phone không được để trống")
                .MaximumLength(11)
                .WithMessage("Phone chỉ tối đa 11 ký tự");

            RuleFor(x => x.Class)
                .NotEmpty()
                .WithMessage("Class không được để trống")
                .MaximumLength(200)
                .WithMessage("Class chỉ tối đa 200 ký tự");

            RuleFor(x => x.Year)
                .NotEmpty()
                .WithMessage("Year không được để trống")
                .MaximumLength(100)
                .WithMessage("Year chỉ tối đa 100 ký tự");

            RuleFor(x => x.Address)
                .NotEmpty()
                .WithMessage("Address không được để trống")
                .MaximumLength(1000)
                .WithMessage("Address chỉ tối đa 1000 ký tự");

            RuleFor(x => x.DepartmentId)
                .NotEmpty()
                .WithMessage("Tên khoa không được để trống");

            RuleFor(x => x.GroupId)
                .NotEmpty()
                .WithMessage("GroupID không được để trống");

            RuleFor(x => x.RoleId)
                .NotEmpty()
                .WithMessage("RoleID không được để trống");
        }
    }
}
