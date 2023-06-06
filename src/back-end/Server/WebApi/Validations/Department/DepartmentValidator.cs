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
                .WithMessage("Name không được để trống")
                .MaximumLength(1000)
                .WithMessage("Name chỉ tối đa 1000 ký tự");
        }
    }
}
