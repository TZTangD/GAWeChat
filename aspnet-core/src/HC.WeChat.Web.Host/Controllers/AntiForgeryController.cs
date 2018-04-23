using Microsoft.AspNetCore.Antiforgery;
using HC.WeChat.Controllers;

namespace HC.WeChat.Web.Host.Controllers
{
    public class AntiForgeryController : WeChatControllerBase
    {
        private readonly IAntiforgery _antiforgery;

        public AntiForgeryController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        public void GetToken()
        {
            _antiforgery.SetCookieTokenAndHeader(HttpContext);
        }
    }
}
