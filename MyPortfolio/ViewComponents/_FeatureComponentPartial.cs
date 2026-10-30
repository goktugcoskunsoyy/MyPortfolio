using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyPortfolio.Context;

namespace MyPortfolio.ViewComponents
{
    public class _FeatureComponentPartial : ViewComponent
    {
        PortfolioContext PortfolioContext = new PortfolioContext();
        public IViewComponentResult Invoke()
        {
            var values = PortfolioContext.Features.ToList();
            return View(values);
        }
    }
}
