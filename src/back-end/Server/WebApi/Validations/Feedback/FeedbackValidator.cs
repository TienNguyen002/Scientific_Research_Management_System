using FluentValidation;
using WebApi.Models.Feedback;

namespace WebApi.Validations.Feedback
{
    public class FeedbackValidator : AbstractValidator<FeedbackEditModel>
    {
        public FeedbackValidator()
        {
            RuleFor(t => t.Username)
                .NotEmpty()
                .WithMessage("Tên người dùng không được để trống")
                .MaximumLength(1000)
                .WithMessage("Tên người dùng chỉ tối đa 1000 ký tự");

            RuleFor(x => x.Content)
                .NotEmpty()
                .WithMessage("Nội dung không được để trống")
                .MaximumLength(1000)
                .WithMessage("Nội dung chỉ tối đa 1000 ký tự");
        }
    }
}
