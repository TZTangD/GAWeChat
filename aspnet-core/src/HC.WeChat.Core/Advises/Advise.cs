using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HC.WeChat.Advises
{
    /// <summary>
    /// 建议反馈
    /// </summary>
    [Table("Advises")]
    public class Advise : Entity<Guid>, IMayHaveTenant, IHasCreationTime
    {

        /// <summary>
        /// 标题
        /// </summary>
        [Required]
        [StringLength(500)]
        public virtual string Title { get; set; }

        /// <summary>
        /// 用户类型名称
        /// </summary>
        [Required]
        [StringLength(50)]
        public virtual string UserTypeName { get; set; }

        /// <summary>
        /// 微信OpenId
        /// </summary>
        [StringLength(50)]
        public virtual string OpenId { get; set; }

        /// <summary>
        /// 联系电话
        /// </summary>
        [StringLength(20)]
        public virtual string Phone { get; set; }

        /// <summary>
        /// 举报内容
        /// </summary>
        [StringLength(500)]
        public virtual string Content { get; set; }

        /// <summary>
        /// 上传图片
        /// </summary>
        [StringLength(2000)]
        public virtual string PhotoUrl { get; set; }

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
