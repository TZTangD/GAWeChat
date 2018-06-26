using System;
using Abp.Application.Services.Dto;
using HC.WeChat.Prizes.Dtos.LTMAutoMapper;
using HC.WeChat.Prizes;
using System.Collections.Generic;
using Abp.Domain.Entities.Auditing;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.Prizes.Dtos
{
    public class PrizeListDto : FullAuditedEntity<Guid>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public string Name { get; set; }
        public int Value { get; set; }
        public Guid LuckyDrawId { get; set; }
        public PrizeType Type { get; set; }
        public string Color { get; set; }
        public ExchangeStyle GetWay { get; set; }
        public int? Num { get; set; }
        public int? UserMaxNum { get; set; }
        public int? WinningNum { get; set; }
        public decimal? WinningRate { get; set; }
        public int? Seq { get; set; }
        public int? ExpiryDay { get; set; }
        public LimitStyle? LimitedMode { get; set; }
        public int? LimitedNum { get; set; }
        //public bool IsDeleted { get; set; }
        //public DateTime CreationTime { get; set; }
        //public long? CreatorUserId { get; set; }
        //public DateTime? LastModificationTime { get; set; }
        //public long? LastModifierUserId { get; set; }
        //public DateTime? DeletionTime { get; set; }
        //public long? DeleterUserId { get; set; }
    }
}