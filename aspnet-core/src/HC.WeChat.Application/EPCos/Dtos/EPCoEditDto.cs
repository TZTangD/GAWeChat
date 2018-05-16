using System.ComponentModel.DataAnnotations;
using HC.WeChat.EPCos.Dtos.LTMAutoMapper;
using HC.WeChat.EPCos;
using System;

namespace HC.WeChat.EPCos.Dtos
{
    public class EPCoEditDto
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public Guid? Id { get; set; }
        /// <summary>
        /// 订单编号
        /// </summary>
        [StringLength(30)]
        public string CO_NUM { get; set; }

        /// <summary>
        /// 零售客户ID
        /// </summary>
        [StringLength(30)]
        public string CUST_ID { get; set; }

        /// <summary>
        /// 销售人员ID
        /// </summary>
        [StringLength(30)]
        public string SLSMAN_ID { get; set; }

        /// <summary>
        /// 订单提交日期 格式:yyyyMMdd
        /// </summary>
        [StringLength(8)]
        public string POSE_DATE { get; set; }
        public decimal? QTY_SUM { get; set; }
        public decimal? AMT_SUM { get; set; }
    }
}