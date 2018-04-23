using System;
using Abp.Application.Services.Dto;
using HC.WeChat.WechatSubscribes.Dtos.LTMAutoMapper;
using HC.WeChat.WechatSubscribes;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.WechatSubscribes.Dtos
{
    public class WechatSubscribeListDto : EntityDto<Guid>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public MsgTypeEnum MsgType { get; set; }
        public string Content { get; set; }
        public int? TenantId { get; set; }
        public DateTime CreationTime { get; set; }
        public long? CreatorUserId { get; set; }
        public DateTime? LastModificationTime { get; set; }
        public long? LastModifierUserId { get; set; }
    }
}