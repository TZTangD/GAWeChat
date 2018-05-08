using System;
using Abp.Application.Services.Dto;
using HC.WeChat.Retailers.Dtos.LTMAutoMapper;
using HC.WeChat.Retailers;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.Retailers.Dtos
{
    public class RetailerListDto : FullAuditedEntityDto<Guid>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public string Code { get; set; }
        public string Name { get; set; }
        public string BusinessAddress { get; set; }
        public string ArchivalLevel { get; set; }
        public string OrderCycle { get; set; }
        public string StoreType { get; set; }
        public string Telephone { get; set; }
        public bool IsAction { get; set; }
        public string BranchCompany { get; set; }
        public string Department { get; set; }
        public Guid? EmployeeId { get; set; }
        public string Manager { get; set; }
        public OrderModeEnum? OrderMode { get; set; }
        public TerminalTypeEnum? TerminalType { get; set; }
        public string BusinessType { get; set; }
        public ScaleEnum? Scale { get; set; }
        public MarketTypeEnum? MarketType { get; set; }
        public string DeliveryLine { get; set; }
        public int? TenantId { get; set; }

        public string LicenseKey { get; set; }

        public string OrderModeName
        {
            get
            {
                return OrderMode.ToString();
            }
        }
        public string TerminalTypeName
        {
            get
            {
                return TerminalType.ToString();
            }
        }
        public string ScaleName
        {
            get
            {
                return Scale.ToString();
            }
        }
        public string MarketTypeName
        {
            get
            {
                return MarketType.ToString();
            }
        }

    }
}