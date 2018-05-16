using System.ComponentModel.DataAnnotations;
using HC.WeChat.GoodSources.Dtos.LTMAutoMapper;
using HC.WeChat.GoodSources;
using System;

namespace HC.WeChat.GoodSources.Dtos
{
    public class GoodSourceEditDto
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public Guid? Id { get; set; }
        /// <summary>
        /// 零售客户编码
        /// </summary>
        [StringLength(255)]
        public string custCode { get; set; }
        public decimal? amount { get; set; }

        /// <summary>
        /// 商品编码
        /// </summary>
        [StringLength(100)]
        public string goodCode { get; set; }
    }
}