using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HC.WeChat.ActivityGoodses
{
    /// <summary>
    /// 活动商品
    /// </summary>
    [Table("ActivityGoodses")]
    public class ActivityGoods : FullAuditedEntity<Guid>
    {

        /// <summary>
        /// 商品规格
        /// </summary>
        [Required]
        [StringLength(200)]
        public string Specification { get; set; }

        /// <summary>
        /// 活动Id，外键
        /// </summary>
        [Required]
        public virtual Guid ActivityId { get; set; }

        /// <summary>
        /// 活动最小数量限制，默认为10条，小于等于0为不限制
        /// </summary>
        [Required]
        public int MinNum { get; set; }

        /// <summary>
        /// 活动单次申请最大数量限制，默认为0，小于等于0不限制
        /// </summary>
        [Required]
        public int MaxNum { get; set; }

        /// <summary>
        /// 优惠说明
        /// </summary>
        public string DiscountDesc { get; set; }

        ///// <summary>
        ///// 租户ID
        ///// </summary>
        //public int? TenantId { get; set; }
    }
}
