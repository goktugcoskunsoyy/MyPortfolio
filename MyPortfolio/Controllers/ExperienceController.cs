using Microsoft.AspNetCore.Mvc;
using MyPortfolio.Context;
using MyPortfolio.Entities;

namespace MyPortfolio.Controllers
{
    public class ExperienceController : Controller
    {
        PortfolioContext portfolipcontext = new PortfolioContext();
        public IActionResult ExperienceList()
        {
            var values = portfolipcontext.Experiences.ToList();
            return View(values);
        }

        [HttpGet]
        public IActionResult CreateExperience()
        {
            return View();
        }

        [HttpPost]
        public IActionResult CreateExperience(Experience experience)
        {
            portfolipcontext.Experiences.Add(experience);
            portfolipcontext.SaveChanges();
            return RedirectToAction("ExperienceList");
        }

        public IActionResult DeleteExperience(int id)
        {
            var values = portfolipcontext.Experiences.Find(id);
            portfolipcontext.Experiences.Remove(values);
            portfolipcontext.SaveChanges();
            return RedirectToAction("ExperienceList");
        }

        [HttpGet]
        public IActionResult UpdateExperience(int id)
        {
            var values = portfolipcontext.Experiences.Find(id);
            return View(values);
        }

        [HttpPost]
        public IActionResult UpdateExperience(Experience experience)
        {
            portfolipcontext.Experiences.Update(experience);
            portfolipcontext.SaveChanges();
            return RedirectToAction("ExperienceList");
        }
    }
}
