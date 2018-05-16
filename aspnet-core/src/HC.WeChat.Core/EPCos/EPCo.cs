using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HC.WeChat.EPCos
{
    [Table("EP_Co")]
    public class EPCo : Entity<Guid>
    {
        /// <summary>
        /// 订单编号
        /// </summary>
        [StringLength(30)]
        public virtual string CO_NUM { get; set; }
        /// <summary>
        /// 零售客户ID
        /// </summary>
        [StringLength(30)]
        public virtual string CUST_ID { get; set; }
        /// <summary>
        /// 销售人员ID
        /// </summary>
        [StringLength(30)]
        public virtual string SLSMAN_ID { get; set; }
        /// <summary>
        /// 订单提交日期 格式:yyyyMMdd
        /// </summary>
        [StringLength(8)]
        public virtual string POSE_DATE { get; set; }
        /// <summary>
        /// 订单数量
        /// </summary>
        public virtual decimal? QTY_SUM { get; set; }
        /// <summary>
        /// 订单金额
        /// </summary>
        public virtual decimal? AMT_SUM { get; set; }
    }
}
