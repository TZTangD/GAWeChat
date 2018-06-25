using System.ComponentModel.DataAnnotations;
using HC.WeChat.LevelLogs.Dtos.LTMAutoMapper;
using HC.WeChat.LevelLogs;
using System.Collections.Generic;
using System;
using Abp.Domain.Entities;

namespace HC.WeChat.LevelLogs.Dtos
{
    public class LevelLogEditDto: Entity<Guid?>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        //public Guid? Id { get; set; }
        /// <summary>
        /// 档级日期
        /// </summary>
        [Required]
        [StringLength(50)]
        public string LevelData { get; set; }
        public DateTime? ChangeTime { get; set; }
    }
}