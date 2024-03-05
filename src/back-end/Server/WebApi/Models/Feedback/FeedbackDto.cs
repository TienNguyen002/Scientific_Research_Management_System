namespace WebApi.Models.Feedback
{
    public class FeedbackDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Content { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
