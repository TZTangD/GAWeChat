using System.ComponentModel.DataAnnotations;
using HC.WeChat.StatisticalDetails.Dtos.LTMAutoMapper;
using HC.WeChat.StatisticalDetails;
using System;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.StatisticalDetails.Dtos
{
    public class StatisticalDetailEditDto
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public Guid? Id { get; set; }

        /// <summary>
        /// 用户微信openid
        /// </summary>
        [Required]
        [StringLength(50)]
        public string OpenId { get; set; }


        /// <summary>
        /// 统计查看文章Id
        /// </summary>
        [Required]
        public Guid ArticleId { get; set; }


        /// <summary>
        /// 类型（枚举：阅读量、点赞）
        /// </summary>
        [Required]
        public CountTypeEnum Type { get; set; }


        /// <summary>
        /// 创建时间
        /// </summary>
        [Required]
        public DateTime CreationTime { get; set; }
        public int? TenantId { get; set; }
    }
}