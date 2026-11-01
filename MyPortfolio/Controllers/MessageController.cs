using Microsoft.AspNetCore.Mvc;
using MyPortfolio.Context;

namespace MyPortfolio.Controllers
{
    public class MessageController : Controller
    {
        PortfolioContext context = new PortfolioContext();
        public IActionResult Inbox()
        {
            var values = context.Messages.ToList();
            return View(values);
        }

        public IActionResult ChangeIsReadTrue(int id) {
            var message = context.Messages.Find(id);
            message.IsRead = true;
            context.SaveChanges();
            return RedirectToAction("Inbox");
        }

        public IActionResult ChangeIsReadFalse(int id)
        {
            var message = context.Messages.Find(id);
            message.IsRead = false;
            context.SaveChanges();
            return RedirectToAction("Inbox");
        }

        public IActionResult DeleteMessage(int id)
        {
            var message = context.Messages.Find(id);
            context.Messages.Remove(message);
            context.SaveChanges();
            return RedirectToAction("Inbox");
        }

        public IActionResult MessageDetails(int id)
        {
            var message = context.Messages.Find(id);
            return View(message);
        }

    }
}
