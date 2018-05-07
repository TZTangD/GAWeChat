using HC.WeChat.MessageHandler;
using HC.WeChat.Models.WeChat;
using HC.WeChat.WechatAppConfigs;
using HC.WeChat.WechatAppConfigs.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Senparc.Weixin.MP;
using Senparc.Weixin.MP.Entities.Request;
using System;
using System.Collections.Generic;
using System.Text;

namespace HC.WeChat.Controllers
{
    [Route("[controller]/[action]")]
    public class YiBinWeChatController : WeChatMessageHandlerControllerBase
    {
        private WeChatTenantSetting _settings;

        private int? tenantId;

        public YiBinWeChatController(IMessageHandlerAppServer messageHandlerAppServer, 
            IWechatAppConfigAppService wechatAppConfigAppService,
            IOptions<WeChatTenantSetting> settings) : base(messageHandlerAppServer, wechatAppConfigAppService)
        {
            _settings = settings.Value;
            tenantId = _settings.YiBin;
            InitAppConfigSetting();
        }

        protected override int? GetTenantId()
        {
            return tenantId;
        }
    }
}
