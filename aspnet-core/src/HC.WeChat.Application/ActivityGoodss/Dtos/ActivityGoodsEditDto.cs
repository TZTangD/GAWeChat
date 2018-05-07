using System.ComponentModel.DataAnnotations;
using HC.WeChat.ActivityGoodses.Dtos.LTMAutoMapper;
using HC.WeChat.ActivityGoodses;
using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;

namespace HC.WeChat.ActivityGoodses.Dtos
{
    [AutoMapTo(typeof(ActivityGoods))]
    public class ActivityGoodsEditDto:AuditedEntityDto<Guid?>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        //public Guid? Id { get; set; }

        /// <summary>
        /// 商品规格
        /// </summary>
        [Required]
        [StringLength(200)]
        public string Specification { get; set; }


        /// <summary>
        /// 活动Id，外键
        /// </summary>
        [Required]
        public Guid ActivityId { get; set; }


        /// <summary>
        /// 活动最小数量限制，默认为10条，小于等于0为不限制
        /// </summary>
        [Required]
        public int MinNum { get; set; }


        /// <summary>
        /// 活动单次申请最大数量限制，默认为0，小于等于0不限制
        /// </summary>
        [Required]
        public int MaxNum { get; set; }
        public string DiscountDesc { get; set; }
    }
}