using System;
using Abp.Application.Services.Dto;
using HC.WeChat.Advises.Dtos.LTMAutoMapper;
using HC.WeChat.Advises;
using Abp.AutoMapper;

namespace HC.WeChat.Advises.Dtos
{
    public class AdviseListDto : EntityDto<Guid>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public string Title { get; set; }
        public string UserTypeName { get; set; }
        public string OpenId { get; set; }
        public string Phone { get; set; }
        public string Content { get; set; }
        public string PhotoUrl { get; set; }
        public int? TenantId { get; set; }
        public DateTime CreationTime { get; set; }
    }

    [Serializable]
    [AutoMapTo(typeof(Advise))]
    public class AdviseDto 
    {
        public string Title { get; set; }
        public string UserTypeName { get; set; }
        public string OpenId { get; set; }
        public string Phone { get; set; }
        public string Content { get; set; }
        public string PhotoUrl { get; set; }
        public int? TenantId { get; set; }
    }
}