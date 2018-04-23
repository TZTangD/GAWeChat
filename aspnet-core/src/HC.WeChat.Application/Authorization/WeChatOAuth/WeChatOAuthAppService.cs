using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using HC.WeChat.WechatAppConfigs.Dtos;
using Senparc.Weixin;
using Senparc.Weixin.Entities;
using Senparc.Weixin.MP;
using Senparc.Weixin.MP.AdvancedAPIs;
using Senparc.Weixin.MP.AdvancedAPIs.OAuth;

namespace HC.WeChat.Authorization.WeChatOAuth
{
    public class WeChatOAuthAppService : WeChatAppServiceBase, IWeChatOAuthAppService
    {
        public WechatAppConfigInfo WechatAppConfig { get; set; }

        public WeChatOAuthAppService()
        {
            WechatAppConfig = new WechatAppConfigInfo();
        }

        /// <summary>
        /// 【异步方法】检验授权凭证（access_token）是否有效（OAuth专用）
        /// </summary>
        public async Task<WxJsonResult> AuthAsync(string oauthAccessToken, string openId)
        {
           return await OAuthApi.AuthAsync(oauthAccessToken, openId);
        }

        /// <summary>
        /// 【异步方法】获取AccessToken（OAuth专用）
        /// </summary>
        public async Task<OAuthAccessTokenResult> GetAccessTokenAsync(string code, string grantType = "authorization_code")
        {
            return await OAuthApi.GetAccessTokenAsync(WechatAppConfig.AppId, WechatAppConfig.AppSecret, code, grantType);
        }

        /// <summary>
        /// 获取验证地址
        /// </summary>
        public string GetAuthorizeUrl(string redirectUrl, string state, OAuthScope scope, string responseType = "code")
        {
            return OAuthApi.GetAuthorizeUrl(WechatAppConfig.AppId, redirectUrl, state, scope, responseType);
        }

        /// <summary>
        /// 异步方法】 获取用户基本信息
        /// </summary>
        public async Task<OAuthUserInfo> GetUserInfoAsync(string oauthAccessToken, string openId, Language lang = Language.zh_CN)
        {
            return await OAuthApi.GetUserInfoAsync(oauthAccessToken, openId, lang);
        }

        /// <summary>
        /// 异步方法】刷新（OAuth专用）access_token（如果需要）
        /// </summary>
        public async Task<OAuthAccessTokenResult> RefreshTokenAsync(string refreshToken, string grantType = "refresh_token")
        {
            return await OAuthApi.RefreshTokenAsync(WechatAppConfig.AppId, refreshToken, grantType);
        }
    }
}
