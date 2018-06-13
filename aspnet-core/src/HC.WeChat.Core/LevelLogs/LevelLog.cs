using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HC.WeChat.LevelLogs
{
    [Table("LevelLogs")]
    public class LevelLog:Entity<Guid>
    {
        /// <summary>
        /// 档级日期
        /// </summary>
        [Required]
        [StringLength(50)]
        public string LevelData { get; set; }

        /// <summary>
        /// 档级更新时间
        /// </summary>
        public DateTime? ChangeTime { get; set; }
    }
}
