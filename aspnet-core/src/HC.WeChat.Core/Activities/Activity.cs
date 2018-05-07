using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using HC.WeChat.ActivityForms;
using HC.WeChat.ActivityGoodses;
using HC.WeChat.WechatEnums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HC.WeChat.Activities
{
    /// <summary>
    /// 营销活动
    /// </summary>
    [Table("Activities")]
    public class Activity : FullAuditedEntity<Guid>, IMayHaveTenant
    {

        /// <summary>
        /// 活动名称
        /// </summary>
        [Required]
        [StringLength(200)]
        public string Name { get; set; }

        /// <summary>
        /// 活动开始时间
        /// </summary>
        [Required]
        public DateTime BeginTime { get; set; }

        /// <summary>
        /// 活动结束时间
        /// </summary>
        [Required]
        public DateTime EndTime { get; set; }

        /// <summary>
        /// 活动分类（办事用烟）数据库可维护
        /// </summary>
        [Required]
        public ActivityTypeEnum ActivityType { get; set; }

        /// <summary>
        /// 活动内容（活动商品，优惠信息和规则）（html页面前端显示）
        /// </summary>
        [Required]
        public string Content { get; set; }

        /// <summary>
        /// 客户经理可存在未完结办事用烟申请，默认15
        /// </summary>
        public int? MUnfinished { get; set; }

        /// <summary>
        /// 零售客户可存在未完结办事用烟申请，默认6
        /// </summary>
        public int? RUnfinished { get; set; }

        /// <summary>
        /// 租户ID
        /// </summary>
        public virtual int? TenantId { get; set; }

        /// <summary>
        /// 活动发布时间
        /// </summary>
        public DateTime? PublishTime { get; set; }

        /// <summary>
        /// 活动状态(枚举 草稿、已发布（已发布也可修改活动信息)
        /// </summary>
        [Required]
        public ActivityStatusEnum Status { get; set; }

        /// <summary>
        /// 活动申请表单
        /// </summary>
        [ForeignKey("ActivityId")]
        public virtual ICollection<ActivityForm> Forms { get; set; }

        /// <summary>
        /// 活动商品
        /// </summary>
        [ForeignKey("ActivityId")]
        public virtual ICollection<ActivityGoods> Goodses { get; set; }
    }
}
