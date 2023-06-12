using FluentValidation;
using WebApi.Models.Topic;

namespace WebApi.Validations.Topics
{
    public class TopicRegisterValidator : AbstractValidator<TopicAddStudent>
    {
        public TopicRegisterValidator()
        {
            RuleFor(s => s.SelectedStudents)
                .Must(HasAtLeastOneStudent)
                .WithMessage("Bạn phải nhập ít nhất một sinh viên");
        }

        private bool HasAtLeastOneStudent(TopicAddStudent model, string selectedStudents)
        {
            return model.GetSelectedStudents().Any();
        }
    }
}
