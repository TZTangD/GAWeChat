using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HC.WeChat.GoodSources
{
    [Table("GoodSources")]
    public class GoodSource : Entity<Guid>
    {
        /// <summary>
        /// 零售客户编码
        /// </summary>
        [StringLength(255)]
        public virtual string custCode { get; set; }
        /// <summary>
        /// 投放数量
        /// </summary>
        public virtual decimal? amount { get; set; }
        /// <summary>
        /// 商品编码
        /// </summary>
        [StringLength(100)]
        public virtual string goodCode { get; set; }
    }
}
