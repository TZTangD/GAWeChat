using System.ComponentModel.DataAnnotations;
using HC.WeChat.WeChatUsers.Dtos.LTMAutoMapper;
using HC.WeChat.WeChatUsers;
using System;
using HC.WeChat.WechatEnums;
using Abp.AutoMapper;

namespace HC.WeChat.WeChatUsers.Dtos
{
    public class WeChatUserEditDto
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public Guid? Id { get; set; }

        /// <summary>
        /// 微信昵称
        /// </summary>
        [Required]
        [StringLength(50)]
        public string NickName { get; set; }


        /// <summary>
        /// 微信OpenId
        /// </summary>
        [Required]
        [StringLength(50)]
        public string OpenId { get; set; }


        /// <summary>
        /// 用户类型(枚举 零售用户、客户经理、营销人员)
        /// </summary>
        [Required]
        public UserTypeEnum UserType { get; set; }


        /// <summary>
        /// 零售用户 或 营销人员Id 外键
        /// </summary>
        public Guid? UserId { get; set; }


        /// <summary>
        /// 零售用户 或 营销人员 名称 快照
        /// </summary>
        [Required]
        [StringLength(50)]
        public string UserName { get; set; }


        /// <summary>
        /// 绑定状态(枚举 已绑定、未绑定)
        /// </summary>
        [Required]
        public BindStatusEnum BindStatus { get; set; }
        public DateTime? BindTime { get; set; }
        public int? TenantId { get; set; }
        public DateTime? UnBindTime { get; set; }

        [StringLength(500)]
        public string HeadImgUrl { get; set; }
    }

    [AutoMapTo(typeof(WeChatUser))]
    public class UserBindDto
    {
        public string OpenId { get; set; }

        public UserTypeEnum UserType { get; set; }

        public string UserName { get; set; }

        public string LicenseKey { get; set; }

        public string Code { get; set; }

        public int? TenantId { get; set; }

        public string NickName { get; set; }

        public string HeadImgUrl { get; set; }
    }
}