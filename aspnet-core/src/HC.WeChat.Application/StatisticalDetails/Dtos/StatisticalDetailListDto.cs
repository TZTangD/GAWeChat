using System;
using Abp.Application.Services.Dto;
using HC.WeChat.StatisticalDetails.Dtos.LTMAutoMapper;
using HC.WeChat.StatisticalDetails;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.StatisticalDetails.Dtos
{
    public class StatisticalDetailListDto : EntityDto<Guid>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public string OpenId { get; set; }
        public Guid ArticleId { get; set; }
        public CountTypeEnum Type { get; set; }
        public DateTime CreationTime { get; set; }
        public int? TenantId { get; set; }
    }
}