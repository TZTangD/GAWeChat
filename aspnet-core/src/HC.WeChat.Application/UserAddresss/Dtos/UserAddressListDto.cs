using System;
using Abp.Application.Services.Dto;
using HC.WeChat.UserAddresss.Dtos.LTMAutoMapper;
using HC.WeChat.UserAddresss;
using System.Collections.Generic;

namespace HC.WeChat.UserAddresss.Dtos
{
    public class UserAddressListDto : FullAuditedEntityDto<Guid>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public Guid? UserId { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public bool? IsDefault { get; set; }
        public string Remark { get; set; }
        public int? TenantId { get; set; }
    }
}