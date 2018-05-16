using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HC.WeChat.GACustPoints
{
    [Table("GA_CustPoints")]
    public class GACustPoint : Entity<int>
    {
        /// <summary>
        /// 客户ID
        /// </summary>
        [StringLength(100)]
        public virtual string LicenseCode { get; set; }
        /// <summary>
        /// 获得积分月 格式：yyyyMM
        /// </summary>
        [StringLength(50)]
        public virtual string Pmonth { get; set; }
        /// <summary>
        /// 获得积分
        /// </summary>
        public virtual int Point { get; set; }
        /// <summary>
        /// 积分匹配的档级
        /// </summary>
        public virtual int Level { get; set; }
    }
}
