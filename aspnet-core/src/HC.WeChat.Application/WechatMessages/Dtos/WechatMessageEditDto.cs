using System.ComponentModel.DataAnnotations;
using HC.WeChat.WechatMessages.Dtos.LTMAutoMapper;
using HC.WeChat.WechatMessages;
using System;
using Abp.AutoMapper;
using Abp.Application.Services.Dto;
using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.WechatMessages.Dtos
{
    [AutoMapTo(typeof(WechatMessage))]
    public class WechatMessageEditDto : AuditedEntityDto<Guid?>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        //public Guid? Id { get; set; }

        /// <summary>
        /// 关键字
        /// </summary>
        [Required]
        [StringLength(50)]
        public string KeyWord { get; set; }


        /// <summary>
        /// 匹配模式（枚举 精准匹配、模糊匹配）
        /// </summary>
        [Required]
        public MatchModeEnum MatchMode { get; set; }


        /// <summary>
        /// 消息类型（枚举 文字消息、图文消息）
        /// </summary>
        [Required]
        public MsgTypeEnum MsgType { get; set; }


        /// <summary>
        /// 回复内容
        /// </summary>
        [Required]
        public string Content { get; set; }


        ///// <summary>
        ///// 租户ID
        ///// </summary>
        //[Required]
        //public int TenantId { get; set; }

    }
}