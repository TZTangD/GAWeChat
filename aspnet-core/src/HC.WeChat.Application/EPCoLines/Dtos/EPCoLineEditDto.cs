using System.ComponentModel.DataAnnotations;
using HC.WeChat.EPCoLines.Dtos.LTMAutoMapper;
using HC.WeChat.EPCoLines;
using System;

namespace HC.WeChat.EPCoLines.Dtos
{
    public class EPCoLineEditDto
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public Guid? Id { get; set; }
        /// <summary>
        /// 订单编号
        /// </summary>
        [StringLength(30)]
        public string CO_NUM { get; set; }
        public int LINE_NUM { get; set; }

        /// <summary>
        /// 商品ID
        /// </summary>
        [StringLength(30)]
        public string ITEM_ID { get; set; }
        [StringLength(30)]
        public string UM_ID { get; set; }
        public decimal? QTY_NEED { get; set; }
        public decimal? QTY_VFY { get; set; }
        public decimal? QTY_ORD { get; set; }
        public decimal? PRI { get; set; }
        public decimal? PRI3 { get; set; }
        public decimal? AMT { get; set; }
    }
}