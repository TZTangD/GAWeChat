using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using HC.WeChat.WechatEnums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HC.WeChat.Manuscripts
{
    /// <summary>
    /// 投稿表
    /// </summary>
    [Table("Manuscripts")]
    public class Manuscript : Entity<Guid>, IMayHaveTenant, IHasCreationTime
    {

        /// <summary>
        /// 投稿类型（枚举：经验分享）
        /// </summary>
        public virtual ArticleTypeEnum? Type { get; set; }

        /// <summary>
        /// 投稿主题
        /// </summary>
        [Required]
        [StringLength(200)]
        public virtual string Title { get; set; }

        /// <summary>
        /// 投稿内容
        /// </summary>
        public virtual string Content { get; set; }

        /// <summary>
        /// 用户姓名
        /// </summary>
        [StringLength(50)]
        public virtual string UserName { get; set; }

        /// <summary>
        /// 联系电话
        /// </summary>
        [StringLength(20)]
        public virtual string Phone { get; set; }

        /// <summary>
        /// 微信openId
        /// </summary>
        [StringLength(50)]
        public virtual string OpenId { get; set; }

        /// <summary>
        /// 处理状态（枚举：未处理、已处理）
        /// </summary>
        public virtual ProcessTypeEnum? Status { get; set; }

        /// <summary>
        /// 租户ID
        /// </summary>
        public virtual int? TenantId { get; set; }

        /// <summary>
        /// CreationTime
        /// </summary>
        [Required]
        public virtual DateTime CreationTime { get; set; }
        
        /// <summary>
        /// 处理时间
        /// </summary>
        public virtual DateTime? DealWithTime { get; set; }

    }
}
