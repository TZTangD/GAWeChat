using System;
using Abp.Application.Services.Dto;
using HC.WeChat.WechatAppConfigs.Dtos.LTMAutoMapper;
using HC.WeChat.WechatAppConfigs;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.WechatAppConfigs.Dtos
{
    public class WechatAppConfigListDto : EntityDto
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public DateTime CreationTime { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public string Name { get; set; }
        public string AppOrgId { get; set; }
        public AppTypeEnum AppType { get; set; }
        public string AppId { get; set; }
        public string AppSecret { get; set; }
        public string QRCodeUrl { get; set; }
        public string Token { get; set; }
        public string AccessToken { get; set; }
        public int? ExpiresIn { get; set; }
        public DateTime? NextGettime { get; set; }
        public int? TenantId { get; set; }
        public long? CreatorUserId { get; set; }
        public long? LastModifierUserId { get; set; }

        public string EncodingAESKey { get; set; }
    }
}