using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyPortfolio.Context;

namespace MyPortfolio.ViewComponents
{
    public class _SkillComponentPartial :ViewComponent
    {
        PortfolioContext PortfolioContext = new PortfolioContext();
        public IViewComponentResult Invoke()
        {
            var values = PortfolioContext.Skills.Include(x => x.SkillItems).OrderBy(x => x.SkillOrder).ToList();
            return View(values);
        }
    }
}
