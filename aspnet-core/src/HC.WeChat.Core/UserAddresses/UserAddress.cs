using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HC.WeChat.UserAddresss
{
    /// <summary>
    /// 收货地址
    /// </summary>
    [Table("UserAddresss")]
    public class UserAddress : FullAuditedEntity<Guid>, IMayHaveTenant
    {

        /// <summary>
        /// 用户Id 外键
        /// </summary>
        public virtual Guid? UserId { get; set; }

        /// <summary>
        /// 收货人姓名
        /// </summary>
        [Required]
        [StringLength(50)]
        public virtual string Name { get; set; }

        /// <summary>
        /// 收货人电话
        /// </summary>
        [Required]
        [StringLength(20)]
        public virtual string Phone { get; set; }

        /// <summary>
        /// 详细收货地址
        /// </summary>
        [Required]
        [StringLength(500)]
        public virtual string Address { get; set; }

        /// <summary>
        /// 是否是默认地址
        /// </summary>
        public virtual bool? IsDefault { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        [StringLength(500)]
        public virtual string Remark { get; set; }

        /// <summary>
        /// 租户ID
        /// </summary>
        public virtual int? TenantId { get; set; }

        ///// <summary>
        ///// 是否删除
        ///// </summary>
        //[Required]
        //public virtual bool IsDeleted { get; set; }

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

        ///// <summary>
        ///// DeletionTime
        ///// </summary>
        //public virtual DateTime? DeletionTime { get; set; }

        ///// <summary>
        ///// DeleterUserId
        ///// </summary>
        //public virtual long? DeleterUserId { get; set; }
    }
}
