using System;
using Abp.Application.Services.Dto;
using HC.WeChat.Shops.Dtos.LTMAutoMapper;
using HC.WeChat.Shops;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.Shops.Dtos
{
    public class ShopListDto : EntityDto<Guid>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public string Name { get; set; }
        public string Address { get; set; }
        public string Desc { get; set; }
        public Guid? RetailerId { get; set; }
        public string CoverPhoto { get; set; }
        public int? SaleTotal { get; set; }
        public int? ReadTotal { get; set; }
        public string Evaluation { get; set; }
        public decimal? Longitude { get; set; }
        public decimal? Latitude { get; set; }
        public ScoreLevelEmun? Status { get; set; }
        public DateTime? AuditTime { get; set; }
        public DateTime CreationTime { get; set; }
        public int? TenantId { get; set; }
    }
}