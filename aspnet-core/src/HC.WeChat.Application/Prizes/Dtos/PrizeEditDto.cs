using System.ComponentModel.DataAnnotations;
using HC.WeChat.Prizes.Dtos.LTMAutoMapper;
using HC.WeChat.Prizes;
using System.Collections.Generic;
using System;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using Abp.Application.Services.Dto;

namespace HC.WeChat.Prizes.Dtos
{
    public class PrizeEditDto: FullAuditedEntity<Guid?>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        //public Guid? Id { get; set; }

        /// <summary>
        /// 名称
        /// </summary>
        [Required]
        [StringLength(50)]
        public string Name { get; set; }


        /// <summary>
        /// 单次中奖数量
        /// </summary>
        [Required]
        public int Value { get; set; }


        /// <summary>
        /// 抽奖活动Id
        /// </summary>
        [Required]
        public Guid LuckyDrawId { get; set; }


        /// <summary>
        /// 类型（积分、实物商品、未中奖 枚举）默认第一个
        /// </summary>
        [Required]
        public int Type { get; set; }


        /// <summary>
        /// 颜色
        /// </summary>
        [StringLength(50)]
        public string Color { get; set; }


        /// <summary>
        /// 兑换方式（线上兑换、线下兑换、邮寄兑换 枚举）默认第一个
        /// </summary>
        [Required]
        public int GetWay { get; set; }
        public int? Num { get; set; }
        public int? UserMaxNum { get; set; }
        public int? WinningNum { get; set; }
        public decimal? WinningRate { get; set; }
        public int? Seq { get; set; }
        public int? ExpiryDay { get; set; }
        public int? LimitedMode { get; set; }
        public int? LimitedNum { get; set; }


        /// <summary>
        /// 是否删除
        /// </summary>
        //[Required]
        //public bool IsDeleted { get; set; }


        /// <summary>
        /// CreationTime
        /// </summary>
        //[Required]
        //public DateTime CreationTime { get; set; }
        //public long? CreatorUserId { get; set; }
        //public DateTime? LastModificationTime { get; set; }
        //public long? LastModifierUserId { get; set; }
        //public DateTime? DeletionTime { get; set; }
        //public long? DeleterUserId { get; set; }
    }
}