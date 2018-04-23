using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace HC.WeChat.Controllers
{
    public abstract class WeChatControllerBase: AbpController
    {
        protected WeChatControllerBase()
        {
            LocalizationSourceName = WeChatConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
