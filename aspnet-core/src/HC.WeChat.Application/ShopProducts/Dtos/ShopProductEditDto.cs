using System.ComponentModel.DataAnnotations;
using HC.WeChat.ShopProducts.Dtos.LTMAutoMapper;
using HC.WeChat.ShopProducts;
using System;
using System.Collections.Generic;

namespace HC.WeChat.ShopProducts.Dtos
{
    public class ShopProductEditDto
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public Guid? Id { get; set; }

        /// <summary>
        /// 特色产品Id
        /// </summary>
        [Required]
        public Guid ProductId { get; set; }


        /// <summary>
        /// 店铺Id
        /// </summary>
        [Required]
        public Guid ShopId { get; set; }


        /// <summary>
        /// 产品规格快照
        /// </summary>
        [StringLength(200)]
        public string Specification { get; set; }
    }

    public class BatchSaveShopProductDto
    {
        public Guid ShopId { get; set; }
        public int? TenantId { get; set; }
        public List<Guid> ProductIds { get; set; }
    }
}