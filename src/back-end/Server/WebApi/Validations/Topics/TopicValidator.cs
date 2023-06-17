using FluentValidation;
using WebApi.Models.Topic;

namespace WebApi.Validations.Topics
{
    public class TopicValidator : AbstractValidator<TopicEditModel>
    {
        public TopicValidator() 
        {
            RuleFor(t => t.Title)
                .NotEmpty()
                .WithMessage("Tiêu đề không được để trống")
                .MaximumLength(1000)
                .WithMessage("Tiêu đề chỉ tối đa 1000 ký tự");

            RuleFor(x => x.Description)
                .NotEmpty()
                .WithMessage("Mô tả không được để trống")
                .MaximumLength(1000)
                .WithMessage("Mô tả chỉ tối đa 1000 ký tự");

            RuleFor(x => x.Note)
                .MaximumLength(1000)
                .WithMessage("Ghi chú chỉ tối đa 1000 ký tự");

            RuleFor(x => x.StudentNumbers)
                .NotEmpty()
                .WithMessage("Số lượng học sinh không được để trống");

            RuleFor(x => x.Price)
                .NotEmpty()
                .WithMessage("Chi phí không được để trống");

            RuleFor(x => x.DepartmentId)
                .NotEmpty()
                .WithMessage("Khoa không được để trống");

            RuleFor(x => x.StatusId)
                .NotEmpty()
                .WithMessage("Trạng thái không được để trống");
        }
    }
}
