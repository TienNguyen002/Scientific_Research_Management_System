using FluentValidation;
using WebApi.Models.Topic;

namespace WebApi.Validations.Topics
{
    public class TopicLecturerValidator : AbstractValidator<TopicAddLecturer>
    {
        public TopicLecturerValidator()
        {
            RuleFor(x => x.LecturerId)
                .NotEmpty()
                .WithMessage("Giảng viên phân công không được để trống");
        }
    }
}
