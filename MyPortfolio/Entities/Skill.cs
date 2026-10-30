namespace MyPortfolio.Entities
{
    public class Skill
    {
        public int SkillId { get; set; }
        public int SkillOrder { get; set; }
        public string SkillTitle { get; set; }
        public string IconUrl { get; set; }
        public List<SkillItem> SkillItems { get; set; }

    }
}
