using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HC.WeChat.ActivityBanquets
{
    /// <summary>
    /// 活动宴席信息
    /// </summary>
    [Table("ActivityBanquets")]
    public class ActivityBanquet : Entity<Guid>, IHasCreationTime
    {

        /// <summary>
        /// 外键 申请表单Id
        /// </summary>
        [Required]
        public virtual Guid ActivityFormId { get; set; }

        /// <summary>
        /// 区县
        /// </summary>
        [Required]
        public string Area { get; set; }

        /// <summary>
        /// 责任人 （客户经理）快照
        /// </summary>
        [StringLength(50)]
        public string Responsible { get; set; }

        /// <summary>
        /// 执行人 （零售用户）快照
        /// </summary>
        [StringLength(50)]
        public string Executor { get; set; }

        /// <summary>
        /// 宴席时间
        /// </summary>
        [Required]
        public DateTime BanquetTime { get; set; }

        /// <summary>
        /// 宴席地点
        /// </summary>
        [Required]
        [StringLength(500)]
        public string Position { get; set; }

        /// <summary>
        /// 现场人数
        /// </summary>
        [Required]
        public int Num { get; set; }

        /// <summary>
        /// 现场简述
        /// </summary>
        [Required]
        [StringLength(500)]
        public string Desc { get; set; }

        /// <summary>
        /// 现场图片不得少于4张
        /// </summary>
        public string PhotoUrl { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        [Required]
        public DateTime CreationTime { get; set; }

        /// <summary>
        /// 创建用户名 快照
        /// </summary>
        [Required]
        [StringLength(50)]
        public string UserName { get; set; }
    }
}
