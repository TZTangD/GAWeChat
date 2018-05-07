using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HC.WeChat.UserQuestions
{
    /// <summary>
    /// 问卷调查表
    /// </summary>
    [Table("UserQuestions")]
    public class UserQuestion : Entity<Guid>, IMayHaveTenant, IHasCreationTime
    {
        /// <summary>
        /// 问题名称
        /// </summary>
        [Required]
        [StringLength(500)]
        public virtual string Name { get; set; }

        /// <summary>
        /// 客户姓名
        /// </summary>
        [StringLength(50)]
        public virtual string UserName { get; set; }

        /// <summary>
        /// 电话号码
        /// </summary>
        [StringLength(20)]
        public virtual string Phone { get; set; }

        /// <summary>
        /// 地址
        /// </summary>
        [StringLength(500)]
        public virtual string Address { get; set; }

        /// <summary>
        /// 微信OpenId
        /// </summary>
        [StringLength(50)]
        public virtual string OpenId { get; set; }

        /// <summary>
        /// 租户ID
        /// </summary>
        public virtual int? TenantId { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        [Required]
        public virtual DateTime CreationTime { get; set; }
    }
}
