using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using HC.WeChat.WechatEnums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HC.WeChat.Shops
{
    /// <summary>
    /// 店铺表
    /// </summary>
    [Table("Shops")]
    public class Shop : Entity<Guid>, IMayHaveTenant, IHasCreationTime
    {

        /// <summary>
        /// 店铺名称
        /// </summary>
        [Required]
        [StringLength(200)]
        public virtual string Name { get; set; }

        /// <summary>
        /// 店铺地址
        /// </summary>
        [StringLength(200)]
        public virtual string Address { get; set; }

        /// <summary>
        /// 店铺描述
        /// </summary>
        [StringLength(500)]
        public virtual string Desc { get; set; }

        /// <summary>
        /// 零售客户Id 外键
        /// </summary>
        public virtual Guid? RetailerId { get; set; }

        /// <summary>
        /// 店铺形象图片
        /// </summary>
        [StringLength(500)]
        public virtual string CoverPhoto { get; set; }

        /// <summary>
        /// 店铺销量
        /// </summary>
        public virtual int? SaleTotal { get; set; }

        /// <summary>
        /// 店铺浏览量，热度
        /// </summary>
        public virtual int? ReadTotal { get; set; }

        /// <summary>
        /// 评价描述（好（0），中（10），差（0））
        /// </summary>
        [StringLength(100)]
        public virtual string  Evaluation { get; set; }

        /// <summary>
        /// 经度
        /// </summary>
        public virtual double? Longitude { get; set; }

        /// <summary>
        /// 纬度
        /// </summary>
        public virtual double? Latitude { get; set; }

        /// <summary>
        /// 腾讯地图经度
        /// </summary>
        public virtual double? QqLongitude { get; set; }

        /// <summary>
        /// 腾讯地图纬度
        /// </summary>
        public virtual double? QqLatitude { get; set; }

        /// <summary>
        /// 审核状态（枚举：提交申请、审核通过、审核未通过）
        /// </summary>
        public virtual ShopAuditStatus? Status { get; set; }

        /// <summary>
        /// 审核时间
        /// </summary>
        public virtual DateTime? AuditTime { get; set; }

        /// <summary>
        /// 申请创建时间
        /// </summary>
        [Required]
        public virtual DateTime CreationTime { get; set; }

        /// <summary>
        /// 租户ID
        /// </summary>
        public virtual int? TenantId { get; set; }

        public virtual string Tel { get; set; }

        /// <summary>
        /// 拒绝理由
        /// </summary>
        public virtual string Reason { get; set; }
    }
}
