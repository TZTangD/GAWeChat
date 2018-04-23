using System.ComponentModel.DataAnnotations;
using HC.WeChat.WechatAppConfigs.Dtos.LTMAutoMapper;
using HC.WeChat.WechatAppConfigs;
using System;
using HC.WeChat.WechatEnums;
using Abp.Application.Services.Dto;
using Abp.Domain.Entities;
using Abp.AutoMapper;

namespace HC.WeChat.WechatAppConfigs.Dtos
{
    [AutoMapTo(typeof(WechatAppConfig))]
    public class WechatAppConfigEditDto : AuditedEntityDto<int?>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        //public int? Id { get; set; }

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
        public int? ExpiresIn { get; set; }
        public DateTime? NextGettime { get; set; }

        public string EncodingAESKey { get; set; }


        ///// <summary>
        ///// 租户ID
        ///// </summary>
        //[Required]
        //public int TenantId { get; set; }
    }
}