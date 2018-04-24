using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HC.WeChat.Activities;
using HC.WeChat.Authorization.WeChatOAuth;
using HC.WeChat.Configuration;
using HC.WeChat.Controllers;
using HC.WeChat.Models.WeChat;
using HC.WeChat.WechatAppConfigs;
using HC.WeChat.WeChatUsers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace HC.WeChat.Web.Host.Controllers
{
    public class GAWXController : WeChatWebControllerBase
    {
        IWeChatOAuthAppService _weChatOAuthAppService;
        IWeChatUserAppService _weChatUserAppService;
        private readonly IConfigurationRoot _appConfiguration;
        private WeChatTenantSetting _settings;
        private int? tenantId;

        private string UserOpenId
        {
            get
            {
                if (HttpContext.Session.GetString("UserOpenId") == null)
                {
                    return string.Empty;
                }
                return HttpContext.Session.GetString("UserOpenId");
            }
            set
            {
                value = value ?? string.Empty;
                HttpContext.Session.SetString("UserOpenId", value);
            }
        }

        protected override int? GetTenantId()
        {
            return tenantId;
        }

        public GAWXController(IWechatAppConfigAppService wechatAppConfigAppService,
          IOptions<WeChatTenantSetting> settings,
          IWeChatOAuthAppService weChatOAuthAppService,
          IWeChatUserAppService weChatUserAppService,
          IActivityAppService activityAppService,
          IHostingEnvironment env) : base(wechatAppConfigAppService)
        {
            _settings = settings.Value;
            tenantId = _settings.GuangAn;
            InitAppConfigSetting();

            _weChatOAuthAppService = weChatOAuthAppService;
            _weChatUserAppService = weChatUserAppService;
            _weChatOAuthAppService.WechatAppConfig = WechatAppConfig;//注入配置
            _appConfiguration = env.GetAppConfiguration();
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}