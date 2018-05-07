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
                if (HttpContext.Session.GetString("GAUserOpenId") == null)
                {
                    return string.Empty;
                }
                return HttpContext.Session.GetString("GAUserOpenId");
            }
            set
            {
                value = value ?? string.Empty;
                HttpContext.Session.SetString("GAUserOpenId", value);
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

        private void SetUserOpenId(string code)
        {
            if (string.IsNullOrEmpty(code))
            {
                return;
            }
            //如果userId为null 则需要通过code重新获取
            if (string.IsNullOrEmpty(UserOpenId))
            {
                try
                {
                    var oauth = _weChatOAuthAppService.GetAccessTokenAsync(code).Result;
                    UserOpenId = oauth.openid;
                }
                catch (Exception ex)
                {
                    Logger.ErrorFormat("GetAccessTokenAsync Exception:{0}", ex.Message);
                }
                //UserOpenId = code;
            }
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Authorization(GAAuthorizationPageEnum page)
        {
            //UserOpenId = "9A7C8776-A623-473F-AF29-10D3E79A2FAE";
            var host = _appConfiguration["App:ServerRootAddress"];
            var tenantId = GetTenantId();
            switch (page)
            {
                case GAAuthorizationPageEnum.PersonalCenter:
                    {
                        if (!string.IsNullOrEmpty(UserOpenId))//如果已获取当前openId 直接跳转到个人中心
                        {
                            return Redirect(string.Format(GAAuthorizationPageUrl.PersonalCenterUrl, UserOpenId, tenantId ?? 0));
                        }
                        var url = host + "/GAWX/PersonalCenter";
                        ViewBag.PageUrl = _weChatOAuthAppService.GetAuthorizeUrl(url, "123", Senparc.Weixin.MP.OAuthScope.snsapi_base);
                    }
                    break;
                case GAAuthorizationPageEnum.MemberCard:
                    {
                        if (!string.IsNullOrEmpty(UserOpenId))
                        {
                            return Redirect(string.Format(GAAuthorizationPageUrl.MemberCardUrl, UserOpenId, tenantId ?? 0));
                        }
                        var url = host + "/GAWX/MemberCard";
                        ViewBag.PageUrl = _weChatOAuthAppService.GetAuthorizeUrl(url, "123", Senparc.Weixin.MP.OAuthScope.snsapi_base);
                    }
                    break;
                case GAAuthorizationPageEnum.MyShop:
                    {
                        if (!string.IsNullOrEmpty(UserOpenId))
                        {
                            return Redirect(string.Format(GAAuthorizationPageUrl.MyShopUrl, UserOpenId, tenantId ?? 0));
                        }
                        var url = host + "/GAWX/MyShop";
                        ViewBag.PageUrl = _weChatOAuthAppService.GetAuthorizeUrl(url, "123", Senparc.Weixin.MP.OAuthScope.snsapi_base);
                    }
                    break;
                default:
                    {
                        return Redirect("/gawechat/index.html");
                    }
            }
            return View();
        }
        /// <summary>
        /// 个人中心
        /// </summary>
        public IActionResult PersonalCenter(string code, string state)
        {
            //存储openId 避免重复提交
            SetUserOpenId(code);
            var tenantId = GetTenantId();
            //UserOpenId = "9A7C8776-A623-473F-AF29-10D3E79A2FAE";

            return Redirect(string.Format(GAAuthorizationPageUrl.PersonalCenterUrl, UserOpenId, tenantId ?? 0));
        }

        /// <summary>
        /// 会员卡
        /// </summary>
        public IActionResult MemberCard(string code, string state)
        {
            //存储openId 避免重复提交
            SetUserOpenId(code);
            var tenantId = GetTenantId();
            //UserOpenId = "9A7C8776-A623-473F-AF29-10D3E79A2FAE";

            return Redirect(string.Format(GAAuthorizationPageUrl.MemberCardUrl, UserOpenId, tenantId ?? 0));
        }

        /// <summary>
        /// 我的店铺
        /// </summary>
        public IActionResult MyShop(string code, string state)
        {
            //存储openId 避免重复提交
            SetUserOpenId(code);
            var tenantId = GetTenantId();
            //UserOpenId = "9A7C8776-A623-473F-AF29-10D3E79A2FAE";

            return Redirect(string.Format(GAAuthorizationPageUrl.MyShopUrl, UserOpenId, tenantId ?? 0));
        }
    }

    public enum GAAuthorizationPageEnum
    {
        PersonalCenter = 1,
        MemberCard = 2,
        ScanIntegral = 3,
        MyShop = 4
    }

    public class GAAuthorizationPageUrl
    {
        public static string PersonalCenterUrl = "/gawechat/index.html#/center/personal/{0}/{1}";
        public static string MemberCardUrl = "/gawechat/index.html#/center/member-card/{0}/{1}";
        public static string MyShopUrl = "/gawechat/index.html#/center/shop/{0}/{1}";
    }
}