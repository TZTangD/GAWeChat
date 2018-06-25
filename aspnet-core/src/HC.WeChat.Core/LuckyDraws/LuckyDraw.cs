using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using HC.WeChat.WechatEnums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HC.WeChat.LuckyDraws
{
    /// <summary>
    /// 抽奖活动
    /// </summary>
    [Table("LuckyDraws")]
    public class LuckyDraw : AuditedEntity<Guid>, IMayHaveTenant
    {

        /// <summary>
        /// 名称
        /// </summary>
        [Required]
        [StringLength(200)]
        public virtual string Name { get; set; }

        /// <summary>
        /// 开始时间
        /// </summary>
        public virtual DateTime? BeginTime { get; set; }

        /// <summary>
        /// 结束时间
        /// </summary>
        public virtual DateTime? EndTime { get; set; }

        /// <summary>
        /// 分类（积分抽奖 枚举）
        /// </summary>
        [Required]
        public virtual LotteryType Type { get; set; }

        /// <summary>
        /// 内容（活动详情）（html页面前端显示）
        /// </summary>
        public virtual string Content { get; set; }

        /// <summary>
        /// 说明（商品，优惠信息和规则信息等）（html页面前端显示）
        /// </summary>
        public virtual string Desc { get; set; }

        /// <summary>
        /// 消耗积分 默认20
        /// </summary>
        public virtual int? Consume { get; set; }

        /// <summary>
        /// 每日抽奖次数 默认5
        /// </summary>
        public virtual int? Frequency { get; set; }

        /// <summary>
        /// 租户ID
        /// </summary>
        public virtual int? TenantId { get; set; }

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
    }
}
