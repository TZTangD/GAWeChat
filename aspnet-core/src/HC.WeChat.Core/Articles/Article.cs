using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using HC.WeChat.WechatEnums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HC.WeChat.Articles
{
    /// <summary>
    /// 推文章表
    /// </summary>
    [Table("Articles")]
    public class Article : FullAuditedEntity<Guid>, IMayHaveTenant
    {

        /// <summary>
        /// 标题
        /// </summary>
        [Required]
        [StringLength(200)]
        public virtual string Title { get; set; }

        /// <summary>
        /// 作者
        /// </summary>
        [Required]
        [StringLength(50)]
        public virtual string Author { get; set; }

        /// <summary>
        /// 文章类型（枚举：营销活动、经验分享）
        /// </summary>
        public virtual ArticleTypeEnum? Type { get; set; }

        /// <summary>
        /// 封面图片
        /// </summary>
        [Required]
        [StringLength(500)]
        public virtual string CoverPhoto { get; set; }

        /// <summary>
        /// 文章内容html
        /// </summary>
        public virtual string Content { get; set; }

        /// <summary>
        /// 阅读量
        /// </summary>
        public virtual int? ReadTotal { get; set; }

        /// <summary>
        /// 点赞数
        /// </summary>
        public virtual int? GoodTotal { get; set; }

        /// <summary>
        /// 租户ID
        /// </summary>
        public virtual int? TenantId { get; set; }

        
    }
}
