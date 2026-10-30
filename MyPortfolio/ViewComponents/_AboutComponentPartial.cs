using Microsoft.AspNetCore.Mvc;
using MyPortfolio.Context;

namespace MyPortfolio.ViewComponents
{
    
    public class _AboutComponentPartial : ViewComponent
    {
        PortfolioContext PortfolioContext = new PortfolioContext();
        public IViewComponentResult Invoke()
        {
            ViewBag.AboutGreeting = PortfolioContext.Abouts.Select(x => x.AboutGreeting).FirstOrDefault();
            ViewBag.AboutTitle = PortfolioContext.Abouts.Select(x => x.AboutTitle).FirstOrDefault();
            ViewBag.AboutIntro = PortfolioContext.Abouts.Select(x => x.AboutIntro).FirstOrDefault();
            ViewBag.AboutDescription = PortfolioContext.Abouts.Select(x => x.AboutDescription).FirstOrDefault();
            ViewBag.AboutImageUrl = PortfolioContext.Abouts.Select(x => x.ImageUrl).FirstOrDefault();
            ViewBag.AboutCvUrl = PortfolioContext.Abouts.Select(x => x.CvUrl).FirstOrDefault();
            return View();
        }
    }
}
