using HC.WeChat.MessageHandler;
using HC.WeChat.Models.WeChat;
using HC.WeChat.WechatAppConfigs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Text;

namespace HC.WeChat.Controllers
{
    [Route("[controller]/[action]")]
    public class DaZhouWeChatController : WeChatMessageHandlerControllerBase
    {
        private WeChatTenantSetting _settings;

        private int? tenantId;

        public DaZhouWeChatController(IMessageHandlerAppServer messageHandlerAppServer, 
            IWechatAppConfigAppService wechatAppConfigAppService, 
            IOptions<WeChatTenantSetting> settings) : base(messageHandlerAppServer, wechatAppConfigAppService)
        {
            _settings = settings.Value;
            tenantId = _settings.DaZhou;
            InitAppConfigSetting();
        }

        protected override int? GetTenantId()
        {
            return tenantId;
        }
    }
}
