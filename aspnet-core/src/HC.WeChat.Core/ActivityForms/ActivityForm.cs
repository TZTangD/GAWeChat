using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using HC.WeChat.ActivityBanquets;
using HC.WeChat.ActivityDeliveryInfos;
using HC.WeChat.ActivityFormLogs;
using HC.WeChat.WechatEnums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HC.WeChat.ActivityForms
{
    /// <summary>
    /// 活动申请单
    /// </summary>
    [Table("ActivityForms")]
    public class ActivityForm : Entity<Guid>, IHasCreationTime
    {

        /// <summary>
        /// 申请单号（系统自动生成AF+算法规则）唯一
        /// </summary>
        [Required]
        [StringLength(50)]
        public string FormCode { get; set; }

        /// <summary>
        /// 活动Id，外键
        /// </summary>
        [Required]
        public Guid ActivityId { get; set; }

        /// <summary>
        /// 零售户Id， 外键
        /// </summary>
        public Guid? RetailerId { get; set; }

        /// <summary>
        /// 申请商品Id，外键 当选择其他的时候 可以为null
        /// </summary>
        public Guid? ActivityGoodsId { get; set; }

        /// <summary>
        /// 申请商品规格 快照
        /// </summary>
        [StringLength(200)]
        public string GoodsSpecification { get; set; }

        /// <summary>
        /// 申请数量（需要做最大最小限制）
        /// </summary>
        [Required]
        public int Num { get; set; }

        /// <summary>
        /// 申请理由
        /// </summary>
        [Required]
        public string Reason { get; set; }

        /// <summary>
        /// 审批状态（枚举 提交申请（不可更改）、
        /// 初审通过（营销中心邮寄消费者奖励，办事完成可回传照片完善资料）、
        /// 最终状态（拒绝、取消（申请人才可取消）、
        /// 完成/审核通过（完善资料审核通过，可邮寄推荐人奖励））
        /// </summary>
        [Required]
        public FormStatusEnum Status { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        [Required]
        public DateTime CreationTime { get; set; }

        /// <summary>
        /// 活动宴席信息
        /// </summary>
        ///[NotMapped]
        //[ForeignKey("ActivityFormId")]
        //public virtual ICollection<ActivityBanquet> Banquet { get; set; }

        /// <summary>
        /// 活动邮件信息
        /// </summary>
        //[NotMapped]
        //[ForeignKey("ActivityFormId")]
        //public virtual ICollection<ActivityDeliveryInfo> DeliveryInfo { get; set; }

        /// <summary>
        /// 活动审批日志
        /// </summary>
        //[NotMapped]
        //[ForeignKey("ActivityFormId")]
        //public virtual ICollection<ActivityFormLog> ApprovalLogs { get; set; }

        /// <summary>
        /// 活动名称 快照
        /// </summary>
        [StringLength(200)]
        public string ActivityName { get; set; }

        /// <summary>
        /// 零售户名称 快照
        /// </summary>
        [StringLength(50)]
        public string RetailerName { get; set; }

        /// <summary>
        /// 客户经理名称 快照
        /// </summary>
        [StringLength(50)]
        public virtual string ManagerName { get; set; }

        public virtual Guid? ManagerId { get; set; }

        public virtual Guid? CreationId { get; set; }

        /// <summary>
        /// 申请用户
        /// </summary>
        [StringLength(50)]
        public virtual string CreationUser { get; set; }
    }
}
