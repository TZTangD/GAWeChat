using System.ComponentModel.DataAnnotations;
using HC.WeChat.ShopEvaluations.Dtos.LTMAutoMapper;
using HC.WeChat.ShopEvaluations;
using System;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.ShopEvaluations.Dtos
{
    public class ShopEvaluationEditDto
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public Guid? Id { get; set; }
        public Guid? PurchaseRecordId { get; set; }


        /// <summary>
        /// 店铺Id 快照
        /// </summary>
        [Required]
        public Guid ShopId { get; set; }


        /// <summary>
        /// 用户微信openid 快照
        /// </summary>
        [Required]
        [StringLength(50)]
        public string OpenId { get; set; }
        public ScoreLevelEmun? Evaluation { get; set; }
        public bool? IsCorrectQuantity { get; set; }


        /// <summary>
        /// 评价内容
        /// </summary>
        [StringLength(500)]
        public string Content { get; set; }


        /// <summary>
        /// 评价创建时间
        /// </summary>
        [Required]
        public DateTime CreationTime { get; set; }
        public int? TenantId { get; set; }
    }
}