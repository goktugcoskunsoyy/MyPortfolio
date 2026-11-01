using Microsoft.EntityFrameworkCore;
using MyPortfolio.Entities;
using System.Data.Common;

namespace MyPortfolio.Context
{
    public class PortfolioContext : DbContext
    {
        override protected void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS;Database=MyPortfolioDb;Trusted_Connection=True;trust server certificate=true");
        }

        public DbSet<Feature> Features { get; set; }
        public DbSet<FeatureTitle> FeatureTitles { get; set; }
        public DbSet<About> Abouts { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<SkillItem> SkillItems { get; set; }
        public DbSet<Experience> Experiences { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectItem> ProjectItems { get; set; }
        public DbSet<Education> Educations { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<SocialMedia> SocialMedias { get; set; }

    }
}
