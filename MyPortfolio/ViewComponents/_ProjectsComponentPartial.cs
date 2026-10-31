using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyPortfolio.Context;

namespace MyPortfolio.ViewComponents
{
    public class _ProjectsComponentPartial : ViewComponent
    {
        PortfolioContext PortfolioContext = new PortfolioContext();
        public IViewComponentResult Invoke()
        {
            var values = PortfolioContext.Projects.Include(x=>x.ProjectItems).ToList();
            return View(values);
        }
    }
}
