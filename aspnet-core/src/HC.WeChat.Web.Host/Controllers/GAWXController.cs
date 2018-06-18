﻿using System;
using HC.WeChat.Authorization.WeChatOAuth;
using HC.WeChat.Controllers;
using HC.WeChat.Dto;
using HC.WeChat.WechatAppConfigs;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senparc.Weixin.MP.Helpers;

namespace HC.WeChat.Web.Host.Controllers
{
    public class GAWXController : WeChatWebControllerBase
    {
        IWeChatOAuthAppService _weChatOAuthAppService;
        //private readonly IConfigurationRoot _appConfiguration;
        //private WeChatTenantSetting _settings;
        private string host = "http://ga.intcov.com";
        //private string host = "http://localhost:21021";
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
          //IOptions<WeChatTenantSetting> settings,
          IWeChatOAuthAppService weChatOAuthAppService//,
          //IHostingEnvironment env
            ) : base(wechatAppConfigAppService)
        {
            //_settings = settings.Value;
            //tenantId = _settings.GuangAn;
            InitAppConfigSetting();

            _weChatOAuthAppService = weChatOAuthAppService;
            _weChatOAuthAppService.WechatAppConfig = WechatAppConfig;//注入配置
            //_appConfiguration = env.GetAppConfiguration();
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

        public IActionResult GetCurrentUserOpenId()
        {
            APIResultDto result = new APIResultDto();
            //UserOpenId = "oPM5Uv81jfyJqWbVxWAH-RUqsCAs";
            //UserOpenId = "oPM5Uv89yy7Iv8k9gLHjjsMTT5Gw";
            //UserOpenId = "oB4nYjnoHhuWrPVi2pYLuPjnCaU0";
            //UserOpenId = "oWusewPRxWuP4wMz3UmHR0y7CJME";
            if (string.IsNullOrEmpty(UserOpenId))
            {
                result.Code = 901;
                result.Msg = "用户没有登录";
            }
            else
            {
                result.Code = 0;
                result.Msg = "获取成功";
                result.Data = new { openId = UserOpenId, tenantId = GetTenantId() };
            }
            return Json(result);
        }

        public IActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 获取JS SDK配置
        /// </summary>
        public IActionResult GetJsApiConfig(string url)
        {
            //var host = _appConfiguration["App:ServerRootAddress"];
            //var url = string.Format("{0}/gawechat", host); //Request.GetAbsoluteUri();  
            var jsApiConfig = JSSDKHelper.GetJsSdkUiPackageAsync(WechatAppConfig.AppId, WechatAppConfig.AppSecret, url).Result;
            return Json(jsApiConfig);
        }

        [HttpGet]
        public IActionResult Authorization(GAAuthorizationPageEnum page, string param)
        {
            //UserOpenId = "9A7C8776-A623-473F-AF29-10D3E79A2FAE";
            //var host = _appConfiguration["App:ServerRootAddress"];
            var url = string.Empty;
            switch (page)
            {
                case GAAuthorizationPageEnum.PersonalCenter:
                    {
                        if (!string.IsNullOrEmpty(UserOpenId))//如果已获取当前openId 直接跳转到个人中心
                        {
                            return Redirect(GAAuthorizationPageUrl.PersonalCenterUrl);
                        }
                        url = host + "/GAWX/PersonalCenter";
                        //ViewBag.PageUrl = _weChatOAuthAppService.GetAuthorizeUrl(url, "123", Senparc.Weixin.MP.OAuthScope.snsapi_base);
                    }
                    break;
                case GAAuthorizationPageEnum.MemberCard:
                    {
                        if (!string.IsNullOrEmpty(UserOpenId))
                        {
                            return Redirect(GAAuthorizationPageUrl.MemberCardUrl);
                        }
                        url = host + "/GAWX/MemberCard";
                        //ViewBag.PageUrl = _weChatOAuthAppService.GetAuthorizeUrl(url, "123", Senparc.Weixin.MP.OAuthScope.snsapi_base);
                    }
                    break;
                case GAAuthorizationPageEnum.MyShop:
                    {
                        if (!string.IsNullOrEmpty(UserOpenId))
                        {
                            return Redirect(GAAuthorizationPageUrl.MyShopUrl);
                        }
                        url = host + "/GAWX/MyShop";
                        //ViewBag.PageUrl = _weChatOAuthAppService.GetAuthorizeUrl(url, "123", Senparc.Weixin.MP.OAuthScope.snsapi_base);
                    }
                    break;
                case GAAuthorizationPageEnum.ScanIntegral:
                    {
                        if (!string.IsNullOrEmpty(UserOpenId))
                        {
                            return Redirect(GAAuthorizationPageUrl.ScanIntegralUrl);
                        }
                        url = host + "/GAWX/ScanIntegral";
                        //ViewBag.PageUrl = _weChatOAuthAppService.GetAuthorizeUrl(url, "123", Senparc.Weixin.MP.OAuthScope.snsapi_base);
                    }
                    break;
                case GAAuthorizationPageEnum.NearbyShop:
                    {
                        if (!string.IsNullOrEmpty(UserOpenId))
                        {
                            return Redirect(GAAuthorizationPageUrl.NearbyShopUrl);
                        }
                        url = host + "/GAWX/NearbyShop";
                        //ViewBag.PageUrl = _weChatOAuthAppService.GetAuthorizeUrl(url, "123", Senparc.Weixin.MP.OAuthScope.snsapi_base);
                    }
                    break;
                case GAAuthorizationPageEnum.Goods:
                    {
                        if (!string.IsNullOrEmpty(UserOpenId))
                        {
                            return Redirect(GAAuthorizationPageUrl.GoodsUrl);
                        }
                        url = host + "/GAWX/Goods";
                        //ViewBag.PageUrl = _weChatOAuthAppService.GetAuthorizeUrl(url, "123", Senparc.Weixin.MP.OAuthScope.snsapi_base);  
                    }
                    break;
                case GAAuthorizationPageEnum.Activity:
                    {
                        //if (!string.IsNullOrEmpty(UserOpenId))
                        //{
                        return Redirect(GAAuthorizationPageUrl.ActivityUrl);
                        //}
                        //url = host + "/GAWX/Activity";
                        //ViewBag.PageUrl = _weChatOAuthAppService.GetAuthorizeUrl(url, "123", Senparc.Weixin.MP.OAuthScope.snsapi_base);
                    }
                    //break;
                case GAAuthorizationPageEnum.Share:
                    {
                        //if (!string.IsNullOrEmpty(UserOpenId))
                        //{
                        return Redirect(GAAuthorizationPageUrl.ShareUrl);
                        //}
                        //url = host + "/GAWX/Share";
                        //ViewBag.PageUrl = _weChatOAuthAppService.GetAuthorizeUrl(url, "123", Senparc.Weixin.MP.OAuthScope.snsapi_base);
                    }
                    //break;
                case GAAuthorizationPageEnum.IntegralDetail:
                    {
                        if (!string.IsNullOrEmpty(UserOpenId))
                        {
                            return Redirect(GAAuthorizationPageUrl.IntegralDetailUrl);
                        }
                        url = host + "/GAWX/IntegralDetail";
                        //ViewBag.PageUrl = _weChatOAuthAppService.GetAuthorizeUrl(url, "123", Senparc.Weixin.MP.OAuthScope.snsapi_base);
                    }
                    break;
                case GAAuthorizationPageEnum.CustBindInfo:
                    {
                        if (!string.IsNullOrEmpty(UserOpenId))
                        {
                            return Redirect(GAAuthorizationPageUrl.CustBindInfoUrl);
                        }
                        url = host + "/GAWX/CustBindInfo";
                        //ViewBag.PageUrl = _weChatOAuthAppService.GetAuthorizeUrl(url, "123", Senparc.Weixin.MP.OAuthScope.snsapi_base);
                    }
                    break;
                case GAAuthorizationPageEnum.ShopReview:
                    {
                        if (!string.IsNullOrEmpty(UserOpenId))
                        {
                            return Redirect(string.Format(GAAuthorizationPageUrl.ShopReviewUrl, param));
                        }
                        url = host + "/GAWX/ShopReview";
                        //ViewBag.PageUrl = _weChatOAuthAppService.GetAuthorizeUrl(url, "123", Senparc.Weixin.MP.OAuthScope.snsapi_base);
                    }
                    break;
                default:
                    { 
                        return Redirect("/gawechat/index.html");
                    }
            }

            param = param ?? "123";
            var pageUrl = _weChatOAuthAppService.GetAuthorizeUrl(url, param, Senparc.Weixin.MP.OAuthScope.snsapi_base);
            return Redirect(pageUrl);
            //return View();
        }
        /// <summary>
        /// 个人中心
        /// </summary>
        public IActionResult PersonalCenter(string code, string state)
        {
            //存储openId 避免重复提交
            SetUserOpenId(code);

            return Redirect(GAAuthorizationPageUrl.PersonalCenterUrl);
        }

        /// <summary>
        /// 会员卡
        /// </summary>
        public IActionResult MemberCard(string code, string state)
        {
            //存储openId 避免重复提交
            SetUserOpenId(code);

            return Redirect(GAAuthorizationPageUrl.MemberCardUrl);
        }

        /// <summary>
        /// 我的店铺
        /// </summary>
        public IActionResult MyShop(string code, string state)
        {
            //存储openId 避免重复提交
            SetUserOpenId(code);

            return Redirect(GAAuthorizationPageUrl.MyShopUrl);
        }

        /// <summary>
        /// 扫码积分
        /// </summary>
        public IActionResult ScanIntegral(string code, string state)
        {
            //存储openId 避免重复提交
            SetUserOpenId(code);

            return Redirect(GAAuthorizationPageUrl.ScanIntegralUrl);
        }

        /// <summary>
        /// 附近店铺
        /// </summary>
        public IActionResult NearbyShop(string code, string state)
        {
            //存储openId 避免重复提交
            SetUserOpenId(code);

            return Redirect(GAAuthorizationPageUrl.NearbyShopUrl);
        }

        /// <summary>
        /// 特色商品
        /// </summary>
        public IActionResult Goods(string code, string state)
        {
            //存储openId 避免重复提交
            SetUserOpenId(code);

            return Redirect(GAAuthorizationPageUrl.GoodsUrl);
        }

        /// <summary>
        /// 营销活动
        /// </summary>
        public IActionResult Activity(string code, string state)
        {
            //存储openId 避免重复提交
            SetUserOpenId(code);

            return Redirect(GAAuthorizationPageUrl.ActivityUrl);
        }

        /// <summary>
        /// 经验分享
        /// </summary>
        public IActionResult Share(string code, string state)
        {
            //存储openId 避免重复提交
            SetUserOpenId(code);

            return Redirect(GAAuthorizationPageUrl.ShareUrl);
        }

        /// <summary>
        /// 积分详情
        /// </summary>
        public IActionResult IntegralDetail(string code, string state)
        {
            //存储openId 避免重复提交
            SetUserOpenId(code);

            return Redirect(GAAuthorizationPageUrl.IntegralDetailUrl);
        }

        /// <summary>
        /// 店员审核
        /// </summary>
        public IActionResult CustBindInfo(string code, string state)
        {
            //存储openId 避免重复提交
            SetUserOpenId(code);

            return Redirect(GAAuthorizationPageUrl.CustBindInfoUrl);
        }

        /// <summary>
        /// 店铺审核
        /// </summary>
        public IActionResult ShopReview(string code, string state)
        {
            //存储openId 避免重复提交
            SetUserOpenId(code);

            return Redirect(string.Format(GAAuthorizationPageUrl.ShopReviewUrl, state));
        }

        public IActionResult Login(string openId)
        {
            UserOpenId = openId;
            return Redirect(GAAuthorizationPageUrl.PersonalCenterUrl);
        }

        //[Route("GAWX/Error/{statusCode}")]
        //[Route("GAWX/Error")]
        public IActionResult Error(int? statusCode)
        {
            return Redirect(GAAuthorizationPageUrl.PersonalCenterUrl);
        }
    }

    public enum GAAuthorizationPageEnum
    {
        PersonalCenter = 1,
        MemberCard = 2,
        ScanIntegral = 3,
        MyShop = 4,
        NearbyShop = 201,
        Goods = 202,
        Activity = 101,
        Share = 102,
        IntegralDetail = 301,
        CustBindInfo = 302,
        ShopReview = 303
    }

    public class GAAuthorizationPageUrl
    {
        public static string PersonalCenterUrl = "/gawechat/index.html#/personals/personal";
        public static string MemberCardUrl = "/gawechat/index.html#/members/member-card";
        public static string MyShopUrl = "/gawechat/index.html#/shops/shop";
        public static string ScanIntegralUrl = "/gawechat/index.html#/scans/scan";

        public static string NearbyShopUrl = "/gawechat/index.html#/nearbies/nearby";
        public static string GoodsUrl = "/gawechat/index.html#/goodses/goods";

        public static string ActivityUrl = "/gawechat/index.html#/activities/activity";
        public static string ShareUrl = "/gawechat/index.html#/shares/share"; 
        public static string IntegralDetailUrl = "/gawechat/index.html#/integrals/integral";
        public static string CustBindInfoUrl = "/gawechat/index.html#/shop-employees/shop-employee";
        public static string ShopReviewUrl = "/gawechat/index.html#/shops/shop;shopId={0};isAudit=true";
    }
}