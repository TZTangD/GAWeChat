using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HC.WeChat.ShopEvaluations
{
    /// <summary>
    /// 店铺评价
    /// </summary>
    [Table("ShopEvaluations")]
    public class ShopEvaluation : Entity<Guid>, IMayHaveTenant, IHasCreationTime
    {

        /// <summary>
        /// 购买记录Id
        /// </summary>
        public virtual Guid? PurchaseRecordId { get; set; }

        /// <summary>
        /// 店铺Id 快照
        /// </summary>
        [Required]
        public virtual Guid ShopId { get; set; }

        /// <summary>
        /// 用户微信openid 快照
        /// </summary>
        [Required]
        [StringLength(50)]
        public virtual string OpenId { get; set; }

        /// <summary>
        /// 评价（枚举: 好=5、中=3、差=1）
        /// </summary>
        public virtual int? Evaluation { get; set; }

        /// <summary>
        /// 购买数量是否相符
        /// </summary>
        public virtual bool? IsCorrectQuantity { get; set; }

        /// <summary>
        /// 评价内容
        /// </summary>
        [StringLength(500)]
        public virtual string Content { get; set; }

        /// <summary>
        /// 评价创建时间
        /// </summary>
        [Required]
        public virtual DateTime CreationTime { get; set; }

        /// <summary>
        /// 租户ID
        /// </summary>
        public virtual int? TenantId { get; set; }
    }
}
