using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using HC.WeChat.WechatEnums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HC.WeChat.StatisticalDetails
{
    /// <summary>
    /// 统计明细
    /// </summary>
    [Table("StatisticalDetails")]
    public class StatisticalDetail : Entity<Guid>, IMayHaveTenant, IHasCreationTime
    {

        /// <summary>
        /// 用户微信openid
        /// </summary>
        [Required]
        [StringLength(50)]
        public virtual string OpenId { get; set; }

        /// <summary>
        /// 统计查看文章Id
        /// </summary>
        [Required]
        public virtual Guid ArticleId { get; set; }

        /// <summary>
        /// 类型（枚举：阅读量、点赞）
        /// </summary>
        [Required]
        public virtual CountTypeEnum Type { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        [Required]
        public virtual DateTime CreationTime { get; set; }

        /// <summary>
        /// 租户ID
        /// </summary>
        public virtual int? TenantId { get; set; }
    }
}
