namespace WebApi.Models.Topic
{
    public class TopicEditModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Note { get; set; }
        public DateTime EndDate { get; set; }
        public int? StudentNumbers { get; set; }
        public string Price { get; set; }
        public int DepartmentId { get; set; }
        public int StatusId { get; set; }
    }
}
