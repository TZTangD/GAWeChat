using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using HC.WeChat.WechatEnums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HC.WeChat.MemberConfigs
{
    /// <summary>
    /// 会员配置表
    /// </summary>
    [Table("MemberConfigs")]
    public class MemberConfig : Entity<Guid>, IHasCreationTime
    {

        /// <summary>
        /// 配置类型（枚举：积分配置）
        /// </summary>
        public virtual DeployTypeEnum? Type { get; set; }

        /// <summary>
        /// 配置代码（枚举：商品购买、商品评价、店铺扫码兑换）
        /// </summary>
        public virtual DeployCodeEnum? Code { get; set; }

        /// <summary>
        /// 配置值
        /// </summary>
        public virtual string Value { get; set; }

        /// <summary>
        /// 租户ID
        /// </summary>
        public virtual int? TenantId { get; set; }

        /// <summary>
        /// 描述信息
        /// </summary>
        public virtual string Desc { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        [Required]
        public virtual DateTime CreationTime { get; set; }
    }
}
