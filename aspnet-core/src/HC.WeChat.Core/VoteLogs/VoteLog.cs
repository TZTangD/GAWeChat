using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using HC.WeChat.WechatEnums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HC.WeChat.VoteLogs
{
    /// <summary>
    /// 投票日志
    /// </summary>
    [Table("VoteLogs")]
    public class VoteLog : Entity<Guid>
    {

        /// <summary>
        /// 投票时间
        /// </summary>
        [Required]
        public virtual DateTime CreateTime { get; set; }

        /// <summary>
        /// OpenId
        /// </summary>
        [Required]
        [StringLength(50)]
        public virtual string OpenId { get; set; }

        /// <summary>
        /// 投票人
        /// </summary>
        [StringLength(50)]
        public virtual string UserName { get; set; }

        /// <summary>
        /// 陈列活动Id
        /// </summary>
        [Required]
        public virtual Guid ExhibitionId { get; set; }
    }
}
