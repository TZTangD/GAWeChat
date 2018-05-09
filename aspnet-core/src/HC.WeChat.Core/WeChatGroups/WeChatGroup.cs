using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using HC.WeChat.WechatEnums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HC.WeChat.WeChatGroups
{
    [Table("WeChatGroups")]
    public class WeChatGroup: AuditedEntity
    {
        /// <summary>
        /// 用户类型code
        /// </summary>
        [Required]
        public UserTypeEnum TypeCode { get; set; }

        /// <summary>
        ///  用户类型名
        /// </summary>
        [StringLength(50)]
        public string TypeName { get; set; }

        /// <summary>
        /// 标签id
        /// </summary>
        [Required]
        public int TagId { get; set; }

        /// <summary>
        /// 标签名
        /// </summary>
        [Required]
        [StringLength(50)]
        public string TagName { get; set; }

        /// <summary>
        /// 租户ID
        /// </summary>
        public int? TenantId { get; set; }

    }
}
