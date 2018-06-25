using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HC.WeChat.WinningRecords
{
    /// <summary>
    /// 中奖纪录
    /// </summary>
    [Table("WinningRecords")]
    public class WinningRecord : Entity<Guid>, IHasCreationTime
    {

        /// <summary>
        /// 奖品Id 外键
        /// </summary>
        public virtual Guid? PrizeId { get; set; }

        /// <summary>
        /// 用户Id 外键
        /// </summary>
        public virtual Guid? UserId { get; set; }

        /// <summary>
        /// 收货地址Id 外键
        /// </summary>
        public virtual Guid? AddressId { get; set; }

        /// <summary>
        /// 中奖时间
        /// </summary>
        public virtual DateTime? WinningTime { get; set; }

        /// <summary>
        /// 中奖数量
        /// </summary>
        public virtual int? Num { get; set; }

        /// <summary>
        /// 过期时间
        /// </summary>
        [Required]
        public virtual DateTime ExpiryTime { get; set; }

        /// <summary>
        /// 状态（未兑换、已申领、已兑换、已过期 枚举）
        /// </summary>
        public virtual int? Status { get; set; }

        /// <summary>
        /// 申领时间
        /// </summary>
        public virtual DateTime? ApplyTime { get; set; }

        /// <summary>
        /// 兑换时间
        /// </summary>
        public virtual DateTime? CompleteTime { get; set; }

        /// <summary>
        /// 快递公司
        /// </summary>
        [StringLength(200)]
        public virtual string ExpressCompany { get; set; }

        /// <summary>
        /// 快递单号
        /// </summary>
        [StringLength(50)]
        public virtual string ExpressNo { get; set; }

        /// <summary>
        /// CreationTime
        /// </summary>
        [Required]
        public virtual DateTime CreationTime { get; set; }

        /// <summary>
        /// CreatorUserId
        /// </summary>
        public virtual long? CreatorUserId { get; set; }
    }
}
