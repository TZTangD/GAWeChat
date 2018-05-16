using System.ComponentModel.DataAnnotations;
using HC.WeChat.Products.Dtos.LTMAutoMapper;
using HC.WeChat.Products;
using HC.WeChat.WechatEnums;
using System;

namespace HC.WeChat.Products.Dtos
{
    public class ProductEditDto
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public Guid? Id { get; set; }

        /// <summary>
        /// 产品规格
        /// </summary>
        [Required]
        [StringLength(200)]
        public string Specification { get; set; }
        public ProductTypeEnum? Type { get; set; }
        public decimal? Price { get; set; }
        public bool? IsRare { get; set; }


        /// <summary>
        /// 包码
        /// </summary>
        [StringLength(50)]
        public string PackageCode { get; set; }


        /// <summary>
        /// 条码
        /// </summary>
        [StringLength(50)]
        public string BarCode { get; set; }
        public int? SearchCount { get; set; }
        public bool? IsAction { get; set; }


        /// <summary>
        /// 申请创建时间
        /// </summary>
        [Required]
        public DateTime CreationTime { get; set; }
        public int? TenantId { get; set; }
        public long? CreatorUserId { get; set; }

        public string PhotoUrl { get; set; }

        /// <summary>
        /// 营销系统code
        /// </summary>
        public string ItemCode { get; set; }

        /// <summary>
        /// 地区编码Id
        /// </summary>
        public string MfrId { get; set; }

        /// <summary>
        /// 商标所属公司
        /// </summary>
        public string Company { get; set; }
    }
}