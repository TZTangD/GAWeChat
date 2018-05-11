using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using HC.WeChat.WechatEnums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HC.WeChat.IntegralDetails
{
    /// <summary>
    /// 积分明细
    /// </summary>
    [Table("IntegralDetails")]
    public class IntegralDetail : Entity<Guid>, IMayHaveTenant, IHasCreationTime
    {

        /// <summary>
        /// 微信openId
        /// </summary>
        [StringLength(50)]
        public virtual string OpenId { get; set; }

        /// <summary>
        /// 初始积分
        /// </summary>
        public virtual int? InitialIntegral { get; set; }

        /// <summary>
        /// 发生积分（正、负）
        /// </summary>
        public virtual int? Integral { get; set; }

        /// <summary>
        /// 结束积分
        /// </summary>
        public virtual int? FinalIntegral { get; set; }

        /// <summary>
        /// 积分类型(枚举：购买商品兑换、评价商品获得、抽奖消费)
        /// </summary>
        public virtual IntegralTypeEnum? Type { get; set; }

        /// <summary>
        /// 描述
        /// </summary>
        [StringLength(500)]
        public virtual string Desc { get; set; }

        /// <summary>
        /// 引用Id
        /// </summary>
        [StringLength(500)]
        public virtual string RefId { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        [Required]
        public virtual DateTime CreationTime { get; set; }

        /// <summary>
        /// 租户ID
        /// </summary>
        public virtual int? TenantId { get; set; }
    }
}
