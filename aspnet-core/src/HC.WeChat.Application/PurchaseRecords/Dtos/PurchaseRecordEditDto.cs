using System.ComponentModel.DataAnnotations;
using HC.WeChat.PurchaseRecords.Dtos.LTMAutoMapper;
using HC.WeChat.PurchaseRecords;
using System;

namespace HC.WeChat.PurchaseRecords.Dtos
{
    public class PurchaseRecordEditDto
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public Guid? Id { get; set; }
        public Guid? ProductId { get; set; }


        /// <summary>
        /// 产品规格 快照
        /// </summary>
        [StringLength(200)]
        public string Specification { get; set; }
        public int? Quantity { get; set; }
        public Guid? ShopId { get; set; }


        /// <summary>
        /// 店铺名称 快照
        /// </summary>
        [StringLength(200)]
        public string ShopName { get; set; }


        /// <summary>
        /// 用户微信openid
        /// </summary>
        [Required]
        [StringLength(50)]
        public string OpenId { get; set; }
        public int? TenantId { get; set; }
        public int? Integral { get; set; }


        /// <summary>
        /// 兑换备注（例：数量2*指导零售价20*兑换比例0.5=20积分）
        /// </summary>
        [StringLength(500)]
        public string Remark { get; set; }


        /// <summary>
        /// 兑换创建时间
        /// </summary>
        [Required]
        public DateTime CreationTime { get; set; }

        [StringLength(50)]
        public string OperatorOpenId { get; set; }

        [StringLength(50)]
        public string OperatorName { get; set; }
    }
}