using FluentValidation;
using WebApi.Models.Department;

namespace WebApi.Validations.Department
{
    public class DepartmentValidator : AbstractValidator<DepartmentEditModel>
    {
        public DepartmentValidator()
        {
            RuleFor(l => l.Name)
                .NotEmpty()
                .WithMessage("Tên khoa không được để trống")
                .MaximumLength(1000)
                .WithMessage("Tên khoa chỉ tối đa 1000 ký tự");
        }
    }
}
