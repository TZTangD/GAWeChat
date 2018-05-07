using Abp.Domain.Entities;
using HC.WeChat.WechatEnums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HC.WeChat.ActivityDeliveryInfos
{
    /// <summary>
    /// 活动收货信息
    /// </summary>
    [Table("ActivityDeliveryInfos")]
    public class ActivityDeliveryInfo : Entity<Guid>
    {

        /// <summary>
        /// 外键 申请表单Id
        /// </summary>
        [Required]
        public virtual Guid ActivityFormId { get; set; }

        /// <summary>
        /// 邮件消费者用户名
        /// </summary>
        [StringLength(50)]
        public string UserName { get; set; }

        /// <summary>
        /// 邮件消费者电话
        /// </summary>
        [StringLength(20)]
        public string Phone { get; set; }

        /// <summary>
        /// 邮件消费者地址
        /// </summary>
        [StringLength(500)]
        public string Address { get; set; }

        /// <summary>
        /// 收货人类型（枚举：消费者、推荐人）
        /// </summary>
        public virtual DeliveryUserTypeEnum? Type { get; set; }

        /// <summary>
        /// 快递公司
        /// </summary>
        [StringLength(200)]
        public virtual string ExpressCompany { get; set; }

        /// <summary>
        /// 快递单号
        /// </summary>
        [StringLength(200)]
        public virtual string ExpressNo { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        [StringLength(500)]
        public virtual string Remark { get; set; }

        /// <summary>
        /// 发件时间
        /// </summary>
        public virtual DateTime? SendTime { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        [Required]
        public virtual DateTime CreationTime { get; set; }

        /// <summary>
        /// 收货备注
        /// </summary>
        [StringLength(500)]
        public virtual string DeliveryRemark { get; set; }

        /// <summary>
        /// 是否邮寄
        /// </summary>
        public virtual bool IsSend { get; set; }
    }
}
