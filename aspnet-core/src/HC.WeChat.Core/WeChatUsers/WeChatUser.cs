using Abp.Domain.Entities;
using HC.WeChat.WechatEnums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HC.WeChat.WeChatUsers
{
    /// <summary>
    /// 微信用户
    /// </summary>
    [Table("WeChatUsers")]
    public class WeChatUser : Entity<Guid>, IMayHaveTenant
    {

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

        /// <summary>
        /// 绑定时间
        /// </summary>
        public DateTime? BindTime { get; set; }

        /// <summary>
        /// 租户ID
        /// </summary>
        public int? TenantId { get; set; }

        /// <summary>
        /// 解绑时间
        /// </summary>
        public DateTime? UnBindTime { get; set; }
        
        /// <summary>
        /// 关注时间
        /// </summary>
        public DateTime? AttentionTime { get; set; }

        /// <summary>
        /// 取关时间
        /// </summary>
        public DateTime? UnfollowTime { get; set; }

        /// <summary>
        /// 用户微信头像
        /// </summary>
        [StringLength(500)]
        public virtual string HeadImgUrl { get; set; }

        /// <summary>
        /// 用户绑定电话
        /// </summary>
        [StringLength(20)]
        public virtual string Phone { get; set; }

        /// <summary>
        /// 会员卡条形码
        /// </summary>
        [StringLength(30)]
        public virtual string MemberBarCode { get; set; }

        /// <summary>
        /// 用户总积分
        /// </summary>
        public virtual int IntegralTotal { get; set; }

        /// <summary>
        /// 是否是店主 针对零售客户
        /// </summary>
        public virtual bool? IsShopkeeper { get; set; }

        /// <summary>
        /// 审核状态(枚举：审核通过、未审核) 非店主零售客户需审核
        /// </summary>
        public virtual UserAuditStatus? Status { get; set; }


        /// <summary>
        /// 微信票据（二维码）
        /// </summary>
        [StringLength(200)]
        public virtual string Ticket { get; set; }

        /// <summary>
        /// 关注来源信息
        /// </summary>
        public virtual SceneType? SourceType { get; set; }

        /// <summary>
        /// 关注来源Id
        /// </summary>
        [StringLength(100)]
        public virtual string  SourceId { get; set; }
    }
}
