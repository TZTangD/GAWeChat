using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HC.WeChat.EPCoLines
{
    [Table("EP_CoLine")]
    public class EPCoLine : Entity<Guid>
    {
        /// <summary>
        /// 订单编号
        /// </summary>
        [StringLength(30)]
        public virtual string CO_NUM { get; set; }
        /// <summary>
        /// 线路编号
        /// </summary>
        public virtual int LINE_NUM { get; set; }
        /// <summary>
        /// 商品ID
        /// </summary>
        [StringLength(30)]
        public virtual string ITEM_ID { get; set; }
        [StringLength(30)]
        public virtual string UM_ID { get; set; }
        public virtual decimal? QTY_NEED { get; set; }
        public virtual decimal? QTY_VFY { get; set; }
        public virtual decimal? QTY_ORD { get; set; }
        public virtual decimal? PRI { get; set; }
        public virtual decimal? PRI3 { get; set; }
        public virtual decimal? AMT { get; set; }
    }
}
