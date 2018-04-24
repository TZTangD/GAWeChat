using System;
using Abp.Application.Services.Dto;
using HC.WeChat.ShopProducts.Dtos.LTMAutoMapper;
using HC.WeChat.ShopProducts;

namespace HC.WeChat.ShopProducts.Dtos
{
    public class ShopProductListDto : EntityDto<Guid>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public Guid ProductId { get; set; }
        public Guid ShopId { get; set; }
        public string Specification { get; set; }
    }
}