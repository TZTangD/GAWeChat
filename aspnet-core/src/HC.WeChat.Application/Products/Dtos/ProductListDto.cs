using System;
using Abp.Application.Services.Dto;
using HC.WeChat.Products.Dtos.LTMAutoMapper;
using HC.WeChat.Products;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.Products.Dtos
{
    public class ProductListDto : EntityDto<Guid>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public string Specification { get; set; }
        public ProductTypeEnum? Type { get; set; }
        public decimal? Price { get; set; }
        public bool? IsRare { get; set; }
        public string PackageCode { get; set; }
        public string BarCode { get; set; }
        public int? SearchCount { get; set; }
        public bool? IsAction { get; set; }
        public DateTime CreationTime { get; set; }
        public int? TenantId { get; set; }
        public long? CreatorUserId { get; set; }

        public string PhotoUrl { get; set; }
        public string TypeName
        {
            get
            {
                return Type.ToString();
            }
        }
    }
}