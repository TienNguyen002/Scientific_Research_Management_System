namespace WebApi.Models.Topic
{
    public class TopicAddStudent
    {
        public string SelectedStudents { get; set; }
        public List<string> GetSelectedStudents()
        {
            return (SelectedStudents ?? "")
                .Split(new[] {',', ';', '\r', '\n'}, StringSplitOptions.RemoveEmptyEntries)
                .ToList();
        }
    }
}
