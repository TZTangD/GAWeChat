using System;
using Abp.Application.Services.Dto;
using HC.WeChat.ActivityFormLogs.Dtos.LTMAutoMapper;
using HC.WeChat.ActivityFormLogs;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.ActivityFormLogs.Dtos
{
    public class ActivityFormLogListDto : EntityDto<Guid>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public Guid ActivityFormId { get; set; }
        public FormStatusEnum Status { get; set; }
        public string StatusName { get; set; }
        public string Opinion { get; set; }
        public UserTypeEnum UserType { get; set; }
        public Guid? UserId { get; set; }
        public string UserName { get; set; }
        public DateTime ActionTime { get; set; }
    }
}