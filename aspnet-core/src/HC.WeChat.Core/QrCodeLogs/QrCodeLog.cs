using Abp.Domain.Entities.Auditing;
using HC.WeChat.WechatEnums;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HC.WeChat.QrCodeLogs
{
    /// <summary>
    /// 奖品
    /// </summary>
    [Table("QrCodeLogs")]
    public class QrCodeLog:CreationAuditedEntity<Guid>
    {

        //public Guid Id { get; set; }

        /// <summary>
        /// 关注时间
        /// </summary>
        [Required]
        public virtual DateTime AttentionTime { get; set; }

        /// <summary>
        /// 微信openId
        /// </summary>
        [StringLength(50)]
        public virtual string OpenId { get; set; }

        /// <summary>
        /// 来源id（店铺id）
        /// </summary>
        [StringLength(100)]
        public virtual string SourceId { get; set; }

        /// <summary>
        /// 关注来源类型
        /// </summary>
        public virtual SceneType? SourceType { get; set; }

        /// <summary>
        /// 票据
        /// </summary>
        [StringLength(200)]
        public virtual string Ticket { get; set; }

        /// <summary>
        /// 租户id
        /// </summary>
        public virtual int? TenantId { get; set; }

        //public Guid CreationTime { get; set; }
        //public Guid CreatorUserId { get; set; }


    }
}
