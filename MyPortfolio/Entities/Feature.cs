namespace MyPortfolio.Entities
{
    public class Feature
    {
        public int FeatureId { get; set; }
        public string FeatureGreeting { get; set; }
        public string FeatureTitle { get; set; }
        public string FreatureDescription { get; set; }
        public List<FeatureTitle> FeatureTitles { get; set; }
    }
}
