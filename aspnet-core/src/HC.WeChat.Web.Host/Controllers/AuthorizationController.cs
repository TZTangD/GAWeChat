using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Authorization;
using HC.WeChat.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace HC.WeChat.Web.Host.Controllers
{
    public class AuthorizationController : WeChatControllerBase
    {
        public IActionResult Index()
        {
            return Redirect("/gawechat/index.html#/activities/activity");
        }
    }
}