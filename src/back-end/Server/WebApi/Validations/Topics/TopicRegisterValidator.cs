using FluentValidation;
using WebApi.Models.Topic;

namespace WebApi.Validations.Topics
{
    public class TopicRegisterValidator : AbstractValidator<TopicAddStudent>
    {
        public TopicRegisterValidator()
        {
            RuleFor(t => t.StudentSlug)
                .NotEmpty()
                .WithMessage("Sinh viên không được để trống")
                .MaximumLength(1000)
                .WithMessage("Sinh viên chỉ tối đa 1000 ký tự");
        }

    }
}
