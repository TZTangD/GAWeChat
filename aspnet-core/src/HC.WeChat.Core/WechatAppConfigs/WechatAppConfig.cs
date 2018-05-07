using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using HC.WeChat.WechatEnums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HC.WeChat.WechatAppConfigs
{
    /// <summary>
    /// 微信授权配置
    /// </summary>
    [Table("WechatAppConfigs")]
    public class WechatAppConfig : AuditedEntity, IMayHaveTenant
    {
        //public DateTime CreationTime { get; set; }
        //public DateTime? LastModificationTime { get; set; }

        /// <summary>
        /// 微信号名
        /// </summary>
        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        /// <summary>
        /// 微信原始ID
        /// </summary>
        [Required]
        [StringLength(250)]
        public string AppOrgId { get; set; }

        /// <summary>
        /// 微信类型（枚举 订阅号、认证订阅号、服务号、认证服务号）
        /// </summary>
        [Required]
        public AppTypeEnum AppType { get; set; }

        /// <summary>
        /// 微信AppID
        /// </summary>
        [Required]
        [StringLength(250)]
        public string AppId { get; set; }

        /// <summary>
        /// 微信AppSecret
        /// </summary>
        [Required]
        [StringLength(250)]
        public string AppSecret { get; set; }

        /// <summary>
        /// 微信EncodingAESKey
        /// </summary>
        [StringLength(500)]
        public string EncodingAESKey { get; set; }

        /// <summary>
        /// 微信二维码图片URL
        /// </summary>
        [StringLength(250)]
        public string QRCodeUrl { get; set; }

        /// <summary>
        /// 微信Token
        /// </summary>
        [Required]
        [StringLength(250)]
        public string Token { get; set; }

        /// <summary>
        /// 微信access_token
        /// </summary>
        [StringLength(255)]
        public string AccessToken { get; set; }

        /// <summary>
        /// 微信expires_in
        /// </summary>
        public int? ExpiresIn { get; set; }

        /// <summary>
        /// 微信next_gettime
        /// </summary>
        public DateTime? NextGettime { get; set; }

        /// <summary>
        /// 租户ID
        /// </summary>
        [Required]
        public int? TenantId { get; set; }


        /// <summary>
        /// CreatorUserId
        ///// </summary>
        //public long? CreatorUserId { get; set; }


        ///// <summary>
        ///// LastModifierUserId
        ///// </summary>
        //public long? LastModifierUserId { get; set; }
    }
}
