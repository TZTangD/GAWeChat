using System;
using Abp.Application.Services.Dto;
using HC.WeChat.Articles.Dtos.LTMAutoMapper;
using HC.WeChat.Articles;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.Articles.Dtos
{
    public class ArticleListDto : FullAuditedEntityDto<Guid>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public string Title { get; set; }
        public string Author { get; set; }
        public string CoverPhoto { get; set; }
        public string Content { get; set; }
        public int? ReadTotal { get; set; }
        public int? GoodTotal { get; set; }
        public int? TenantId { get; set; }
        public ArticleTypeEnum? Type { get; set; }
        public ArticlePushStatusEnum? PushStatus { get; set; }
        public string PushStatusName
        {
            get
            {
                return PushStatus.ToString();
            }
        }

    }
}