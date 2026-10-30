namespace MyPortfolio.Entities
{
    public class Project
    {
        public int projectId { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public string FilterKeys { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public string ProjectUrl { get; set; }
        public List<ProjectItem> ProjectItems { get; set; }
    }
}
