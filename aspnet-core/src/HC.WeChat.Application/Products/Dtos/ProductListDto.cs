using System;
using Abp.Application.Services.Dto;
using HC.WeChat.Products.Dtos.LTMAutoMapper;
using HC.WeChat.Products;
using HC.WeChat.WechatEnums;
using Abp.AutoMapper;
using System.Collections.Generic;

namespace HC.WeChat.Products.Dtos
{
    [AutoMapFrom(typeof(Product))]
    public class ProductListDto : EntityDto<Guid>
    {
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

    public class RareProductDto
    {
        /// <summary>
        /// 卷烟类
        /// </summary>
        public List<ProductListDto> CigaretteProducts { get; set; }

        /// <summary>
        /// 特产类
        /// </summary>
        public List<ProductListDto> SpecialProducts { get; set; }
    }

    /// <summary>
    /// 购买商品Dto
    /// </summary>
    [AutoMapFrom(typeof(Product))]
    public class ShopProductDto : EntityDto<Guid>
    {
        public string Specification { get; set; }

        public decimal? Price { get; set; }

        public string PackageCode { get; set; }

        public string BarCode { get; set; }

        public int Num { get; set; }
    }
}