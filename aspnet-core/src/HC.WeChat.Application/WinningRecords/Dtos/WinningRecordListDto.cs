using System;
using Abp.Application.Services.Dto;
using HC.WeChat.WinningRecords.Dtos.LTMAutoMapper;
using HC.WeChat.WinningRecords;
using System.Collections.Generic;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.WinningRecords.Dtos
{
    public class WinningRecordListDto : EntityDto<Guid>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public Guid? PrizeId { get; set; }
        public Guid? UserId { get; set; }
        public Guid? AddressId { get; set; }
        public DateTime? WinningTime { get; set; }
        public int? Num { get; set; }
        public DateTime ExpiryTime { get; set; }
        public WinPrizeStatus? Status { get; set; }
        public DateTime? ApplyTime { get; set; }
        public DateTime? CompleteTime { get; set; }
        public string ExpressCompany { get; set; }
        public string ExpressNo { get; set; }
        public DateTime CreationTime { get; set; }
        public long? CreatorUserId { get; set; }

        public string PrizeName { get; set; }
        public string UserName { get; set; }

        public string StatusName
        {
            get
            {
                return Status.ToString();
            }
        }
    }
}