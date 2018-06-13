using System.ComponentModel.DataAnnotations;
using HC.WeChat.GACustPoints.Dtos.LTMAutoMapper;
using HC.WeChat.GACustPoints;
using System;

namespace HC.WeChat.GACustPoints.Dtos
{
    public class GACustPointEditDto
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public Guid? Id { get; set; }
        /// <summary>
        /// 客户ID
        /// </summary>
        [StringLength(100)]
        public string CustId { get; set; }

        /// <summary>
        /// 获得积分月 格式：yyyyMM
        /// </summary>
        [StringLength(50)]
        public string Pmonth { get; set; }
        public int Point { get; set; }
        public int Level { get; set; }
    }
}