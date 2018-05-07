using Abp.AutoMapper;
using HC.WeChat.WechatEnums;
using System;
using System.Collections.Generic;
using System.Text;

namespace HC.WeChat.WechatAppConfigs.Dtos
{
    [AutoMapFrom(typeof(WechatAppConfig))]
    public class WechatAppConfigInfo
    {
        public string AppId { get; set; }

        public string AppSecret { get; set; }

        public string Token { get; set; }

        public string EncodingAESKey { get; set; }
    }
}
