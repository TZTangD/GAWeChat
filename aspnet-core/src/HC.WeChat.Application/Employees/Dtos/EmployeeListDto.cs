using System;
using Abp.Application.Services.Dto;
using HC.WeChat.Employees.Dtos.LTMAutoMapper;
using HC.WeChat.Employees;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.Employees.Dtos
{
    public class EmployeeListDto : FullAuditedEntityDto<Guid>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public string Code { get; set; }
        public string Name { get; set; }
        public UserTypeEnum Position { get; set; }
        public string Phone { get; set; }
        public string Company { get; set; }
        public string Department { get; set; }
        public bool IsAction { get; set; }
        public int? TenantId { get; set; }
        public string PositionName {
            get
            {
                return this.Position.ToString();
            }
        }
    }
}