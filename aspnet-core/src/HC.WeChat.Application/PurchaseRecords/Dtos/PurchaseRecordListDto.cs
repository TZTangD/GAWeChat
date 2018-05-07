using System;
using Abp.Application.Services.Dto;
using HC.WeChat.PurchaseRecords.Dtos.LTMAutoMapper;
using HC.WeChat.PurchaseRecords;

namespace HC.WeChat.PurchaseRecords.Dtos
{
    public class PurchaseRecordListDto : EntityDto<Guid>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public Guid? ProductId { get; set; }
        public string Specification { get; set; }
        public int? Quantity { get; set; }
        public Guid? ShopId { get; set; }
        public string ShopName { get; set; }
        public string OpenId { get; set; }
        public int? TenantId { get; set; }
        public int? Integral { get; set; }
        public string Remark { get; set; }
        public DateTime CreationTime { get; set; }
    }
}