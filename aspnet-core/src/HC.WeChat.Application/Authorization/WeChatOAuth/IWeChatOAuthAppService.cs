using Abp.Application.Services;
using HC.WeChat.WechatAppConfigs.Dtos;
using Senparc.Weixin;
using Senparc.Weixin.Entities;
using Senparc.Weixin.MP;
using Senparc.Weixin.MP.AdvancedAPIs.OAuth;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HC.WeChat.Authorization.WeChatOAuth
{
    public interface IWeChatOAuthAppService : IApplicationService
    {
        WechatAppConfigInfo WechatAppConfig { get; set; }
        string GetAuthorizeUrl(string redirectUrl, string state, OAuthScope scope, string responseType = "code");

        Task<OAuthAccessTokenResult> GetAccessTokenAsync(string code, string grantType = "authorization_code");

        Task<OAuthAccessTokenResult> RefreshTokenAsync(string refreshToken, string grantType = "refresh_token");

        Task<OAuthUserInfo> GetUserInfoAsync(string oauthAccessToken, string openId, Language lang = Language.zh_CN);

        Task<WxJsonResult> AuthAsync(string oauthAccessToken, string openId);

    }
}
