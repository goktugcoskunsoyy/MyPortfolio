using Microsoft.AspNetCore.Mvc;
using MyPortfolio.Context;

namespace MyPortfolio.ViewComponents
{
    public class _SkillComponentPartial :ViewComponent
    {
        PortfolioContext PortfolioContext = new PortfolioContext();
        public IViewComponentResult Invoke()
        {
            var values = PortfolioContext.Skills.ToList();
            return View(values);
        }
    }
}
