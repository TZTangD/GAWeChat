using System;
using Abp.Application.Services.Dto;
using HC.WeChat.Shops.Dtos.LTMAutoMapper;
using HC.WeChat.Shops;
using HC.WeChat.WechatEnums;
using Abp.AutoMapper;

namespace HC.WeChat.Shops.Dtos
{
    [AutoMapFrom(typeof(Shop))]
    public class ShopListDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string Desc { get; set; }
        public Guid? RetailerId { get; set; }
        public string RetailerName { get; set; }
        public string CoverPhoto { get; set; }
        public int? SaleTotal { get; set; }
        public int? ReadTotal { get; set; }
        public string RetailerCode { get; set; }


        /// <summary>
        /// 排重浏览量
        /// </summary>
        public int? SingleTotal { get; set; }
        public string Evaluation { get; set; }
        public double? Longitude { get; set; }
        public double? Latitude { get; set; }
        public double? QqLongitude { get; set; }
        public double? QqLatitude { get; set; }
        public ShopAuditStatus? Status { get; set; }
        public DateTime? AuditTime { get; set; }
        public DateTime CreationTime { get; set; }
        public int? TenantId { get; set; }
        public string StatusName
        {
            get
            {
                return Status.ToString();
            }
        }

        public string Tel { get; set; }

        /// <summary>
        /// 拒绝理由
        /// </summary>
        public string Reason { get; set; }

        /// <summary>
        /// 微信票据（二维码）
        /// </summary>
        public string Ticket { get; set; }

        /// <summary>
        /// 二维码url
        /// </summary>
        public string WechatUrl { get; set; }

        /// <summary>
        /// 二维码图片url
        /// </summary>
        public string QRUrl { get; set; }
    }
    [AutoMapFrom(typeof(Shop))]
    public class CheckShopDto
    {
        public Guid Id { get; set; }
        public ShopAuditStatus? Status { get; set; }
        public string Reason { get; set; }
        //public DateTime? AuditTime { get; set; }
    }

    [AutoMapFrom(typeof(Shop))]
    public class NearbyShopDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string CoverPhoto { get; set; }
        public double? Longitude { get; set; }
        public double? Latitude { get; set; }
        public double? QqLongitude { get; set; }
        public double? QqLatitude { get; set; }
        public string Tel { get; set; }
        public double Distance { get; set; }
    }
    /// <summary>
    /// 首页信息
    /// </summary>
    public class HomeInfo
    {
        public int ShopCount { get; set; }

        public int PendingShopCount { get; set; }

        public int GoodsSearchCount { get; set; }

        public int IntegralTotal { get; set; }

        public int WechatUserCount { get; set; }

    }

    /// <summary>
    /// 生成店铺二维码返回结果
    /// </summary>
    public class CreateQRResult {
        /// <summary>
        /// 票据
        /// </summary>
        public string Ticket { get; set; }
        /// <summary>
        /// 二维码图片解析后的地址（根据它可自行生成二维码）
        /// </summary>
        public string Url { get; set; }
        /// <summary>
        /// 本地二维码图片Url
        /// </summary>
        public string QRUrl { get; set; }

    }
}