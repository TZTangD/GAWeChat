using System;
using Abp.Application.Services.Dto;
using HC.WeChat.Activities.Dtos.LTMAutoMapper;
using HC.WeChat.Activities;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.Activities.Dtos
{
    public class ActivityListDto : EntityDto<Guid>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public string Name { get; set; }
        public DateTime BeginTime { get; set; }
        public DateTime EndTime { get; set; }
        public ActivityTypeEnum ActivityType { get; set; }
        public string Content { get; set; }
        public int? MUnfinished { get; set; }
        public int? RUnfinished { get; set; }
        public int? TenantId { get; set; }
        public DateTime? PublishTime { get; set; }
        public WechatEnums.ActivityStatusEnum Status { get; set; }
        public string StatusName {
            get {
                return Status.ToString();
            }
        }
        public string TypeName
        {
            get
            {
                return ActivityType.ToString();
            }
        }
    }
}