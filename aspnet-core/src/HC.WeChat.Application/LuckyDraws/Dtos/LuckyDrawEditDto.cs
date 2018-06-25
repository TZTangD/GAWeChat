using System.ComponentModel.DataAnnotations;
using HC.WeChat.LuckyDraws.Dtos.LTMAutoMapper;
using HC.WeChat.LuckyDraws;
using System.Collections.Generic;
using System;
using Abp.Application.Services.Dto;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.LuckyDraws.Dtos
{
    public class LuckyDrawEditDto: AuditedEntityDto<Guid?>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        //public Guid? Id { get; set; }

        /// <summary>
        /// 名称
        /// </summary>
        [Required]
        [StringLength(200)]
        public string Name { get; set; }
        public DateTime? BeginTime { get; set; }
        public DateTime? EndTime { get; set; }


        /// <summary>
        /// 分类（积分抽奖 枚举）
        /// </summary>
        [Required]
        public LotteryType Type { get; set; }
        public string Content { get; set; }
        public string Desc { get; set; }
        public int? Consume { get; set; }
        public int? Frequency { get; set; }
        public int? TenantId { get; set; }
    }
}