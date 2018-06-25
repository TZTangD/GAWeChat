using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using HC.WeChat.WechatEnums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HC.WeChat.Prizes
{
    /// <summary>
    /// 奖品
    /// </summary>
    [Table("Prizes")]
    public class Prize : FullAuditedEntity<Guid>
    {

        /// <summary>
        /// 名称
        /// </summary>
        [Required]
        [StringLength(50)]
        public virtual string Name { get; set; }

        /// <summary>
        /// 单次中奖数量
        /// </summary>
        [Required]
        public virtual int Value { get; set; }

        /// <summary>
        /// 抽奖活动Id
        /// </summary>
        [Required]
        public virtual Guid LuckyDrawId { get; set; }

        /// <summary>
        /// 类型（积分、实物商品、未中奖 枚举）默认第一个
        /// </summary>
        [Required]
        public virtual PrizeType Type { get; set; }

        /// <summary>
        /// 颜色
        /// </summary>
        [StringLength(50)]
        public virtual string Color { get; set; }

        /// <summary>
        /// 兑换方式（线上兑换、线下兑换、邮寄兑换 枚举）默认第一个
        /// </summary>
        [Required]
        public virtual ExchangeStyle GetWay { get; set; }

        /// <summary>
        /// 投放总量 不填表示不受限制
        /// </summary>
        public virtual int? Num { get; set; }

        /// <summary>
        /// 单个用户中奖最大数量
        /// </summary>
        public virtual int? UserMaxNum { get; set; }

        /// <summary>
        /// 中奖总数
        /// </summary>
        public virtual int? WinningNum { get; set; }

        /// <summary>
        /// 中奖率（所有奖品之和不能超过100%）
        /// </summary>
        public virtual decimal? WinningRate { get; set; }

        /// <summary>
        /// 奖品排序
        /// </summary>
        public virtual int? Seq { get; set; }

        /// <summary>
        /// 兑换过期时间 单位（天）计算，开始时间中奖时间开始
        /// </summary>
        public virtual int? ExpiryDay { get; set; }

        /// <summary>
        /// 限量方式（不限量、每天、每月）默认不限量
        /// </summary>
        public virtual LimitStyle? LimitedMode { get; set; }

        /// <summary>
        /// 限量数量
        /// </summary>
        public virtual int? LimitedNum { get; set; }

        ///// <summary>
        ///// 是否删除
        ///// </summary>
        //[Required]
        //public virtual bool IsDeleted { get; set; }

        ///// <summary>
        ///// CreationTime
        ///// </summary>
        //[Required]
        //public virtual DateTime CreationTime { get; set; }

        ///// <summary>
        ///// CreatorUserId
        ///// </summary>
        //public virtual long? CreatorUserId { get; set; }

        ///// <summary>
        ///// LastModificationTime
        ///// </summary>
        //public virtual DateTime? LastModificationTime { get; set; }

        ///// <summary>
        ///// LastModifierUserId
        ///// </summary>
        //public virtual long? LastModifierUserId { get; set; }

        ///// <summary>
        ///// DeletionTime
        ///// </summary>
        //public virtual DateTime? DeletionTime { get; set; }

        ///// <summary>
        ///// DeleterUserId
        ///// </summary>
        //public virtual long? DeleterUserId { get; set; }
        ////public int? TenantId { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    }
}
