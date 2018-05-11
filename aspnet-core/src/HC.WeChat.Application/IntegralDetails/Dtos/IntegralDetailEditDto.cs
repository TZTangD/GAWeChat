using System.ComponentModel.DataAnnotations;
using HC.WeChat.IntegralDetails.Dtos.LTMAutoMapper;
using HC.WeChat.IntegralDetails;
using System;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.IntegralDetails.Dtos
{
    public class IntegralDetailEditDto
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public Guid? Id { get; set; }

        /// <summary>
        /// 微信openId
        /// </summary>
        [StringLength(50)]
        public string OpenId { get; set; }
        public int? InitialIntegral { get; set; }
        public int? Integral { get; set; }
        public int? FinalIntegral { get; set; }
        /// <summary>
        /// 积分类型(枚举：购买商品兑换、评价商品获得、抽奖消费)
        /// </summary>
        public IntegralTypeEnum? Type { get; set; }

        /// <summary>
        /// 描述
        /// </summary>
        [StringLength(500)]
        public string Desc { get; set; }
        [StringLength(500)]
        public string RefId { get; set; }


        /// <summary>
        /// 创建时间
        /// </summary>
        [Required]
        public DateTime CreationTime { get; set; }
        public int? TenantId { get; set; }
    }
}