using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HC.WeChat.PurchaseRecords
{
    /// <summary>
    /// 购买记录
    /// </summary>
    [Table("PurchaseRecords")]
    public class PurchaseRecord : Entity<Guid>, IMayHaveTenant, IHasCreationTime
    {

        /// <summary>
        /// 兑换产品Id
        /// </summary>
        public virtual Guid? ProductId { get; set; }

        /// <summary>
        /// 产品规格 快照
        /// </summary>
        [StringLength(200)]
        public virtual string Specification { get; set; }

        /// <summary>
        /// 购买数量
        /// </summary>
        public virtual int? Quantity { get; set; }

        /// <summary>
        /// 兑换店铺Id
        /// </summary>
        public virtual Guid? ShopId { get; set; }

        /// <summary>
        /// 店铺名称 快照
        /// </summary>
        [StringLength(200)]
        public virtual string ShopName { get; set; }

        /// <summary>
        /// 用户微信openid
        /// </summary>
        [Required]
        [StringLength(50)]
        public virtual string OpenId { get; set; }

        /// <summary>
        /// 租户ID
        /// </summary>
        public virtual int? TenantId { get; set; }

        /// <summary>
        /// 兑换积分
        /// </summary>
        public virtual int? Integral { get; set; }

        /// <summary>
        /// 兑换备注（例：数量2*指导零售价20*兑换比例0.5=20积分）
        /// </summary>
        [StringLength(500)]
        public virtual string Remark { get; set; }

        /// <summary>
        /// 兑换创建时间
        /// </summary>
        [Required]
        public virtual DateTime CreationTime { get; set; }
    }
}
