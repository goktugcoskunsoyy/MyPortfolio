using Microsoft.AspNetCore.Mvc;
using MyPortfolio.Context;

namespace MyPortfolio.ViewComponents
{
    public class _EducationComponentPartial : ViewComponent
    {
        PortfolioContext portfoliocontext = new PortfolioContext();
        public IViewComponentResult Invoke()
        {
            var values = portfoliocontext.Educations.ToList();
            return View(values);
        }
    }
}
