using System.ComponentModel.DataAnnotations;
using HC.WeChat.WinningRecords.Dtos.LTMAutoMapper;
using HC.WeChat.WinningRecords;
using System.Collections.Generic;
using System;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.WinningRecords.Dtos
{
    public class WinningRecordEditDto
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public Guid? Id { get; set; }
        public Guid? PrizeId { get; set; }
        public Guid? UserId { get; set; }
        public Guid? AddressId { get; set; }
        public DateTime? WinningTime { get; set; }
        public int? Num { get; set; }


        /// <summary>
        /// 过期时间
        /// </summary>
        [Required]
        public DateTime ExpiryTime { get; set; }
        public WinPrizeStatus? Status { get; set; }
        public DateTime? ApplyTime { get; set; }
        public DateTime? CompleteTime { get; set; }


        /// <summary>
        /// 快递公司
        /// </summary>
        [StringLength(200)]
        public string ExpressCompany { get; set; }


        /// <summary>
        /// 快递单号
        /// </summary>
        [StringLength(50)]
        public string ExpressNo { get; set; }


        /// <summary>
        /// CreationTime
        /// </summary>
        [Required]
        public DateTime CreationTime { get; set; }
        public long? CreatorUserId { get; set; }
    }
}