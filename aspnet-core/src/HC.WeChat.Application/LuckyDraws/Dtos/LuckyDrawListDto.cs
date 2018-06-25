using System;
using Abp.Application.Services.Dto;
using HC.WeChat.LuckyDraws.Dtos.LTMAutoMapper;
using HC.WeChat.LuckyDraws;
using System.Collections.Generic;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.LuckyDraws.Dtos
{
    public class LuckyDrawListDto : AuditedEntityDto<Guid>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public string Name { get; set; }
        public DateTime? BeginTime { get; set; }
        public DateTime? EndTime { get; set; }
        public LotteryType Type { get; set; }
        public string Content { get; set; }
        public string Desc { get; set; }
        public int? Consume { get; set; }
        public int? Frequency { get; set; }
        public int? TenantId { get; set; }
    }
}