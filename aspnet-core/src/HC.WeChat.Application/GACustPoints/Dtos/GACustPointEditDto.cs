using System.ComponentModel.DataAnnotations;
using HC.WeChat.GACustPoints.Dtos.LTMAutoMapper;
using HC.WeChat.GACustPoints;

namespace HC.WeChat.GACustPoints.Dtos
{
    public class GACustPointEditDto
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public int? Id { get; set; }
        /// <summary>
        /// 客户ID
        /// </summary>
        [StringLength(100)]
        public string LicenseCode { get; set; }

        /// <summary>
        /// 获得积分月 格式：yyyyMM
        /// </summary>
        [StringLength(50)]
        public string Pmonth { get; set; }
        public int Point { get; set; }
        public int Level { get; set; }
    }
}