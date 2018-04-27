using System;
using Abp.Application.Services.Dto;
using HC.WeChat.Manuscripts.Dtos.LTMAutoMapper;
using HC.WeChat.Manuscripts;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.Manuscripts.Dtos
{
    public class ManuscriptListDto : EntityDto<Guid>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public ArticleTypeEnum? Type { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string UserName { get; set; }
        public string Phone { get; set; }
        public string OpenId { get; set; }
        public ProcessTypeEnum? Status { get; set; }
        public int? TenantId { get; set; }
        public DateTime CreationTime { get; set; }
        public string StatusName
        {
            get
            {
                return Status.ToString();
            }
        }
        public DateTime? DealWithTime { get; set; }
    }
}