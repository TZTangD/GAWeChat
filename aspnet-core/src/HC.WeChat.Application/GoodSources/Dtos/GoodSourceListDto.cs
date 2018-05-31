using System;
using Abp.Application.Services.Dto;
using HC.WeChat.GoodSources.Dtos.LTMAutoMapper;
using HC.WeChat.GoodSources;

namespace HC.WeChat.GoodSources.Dtos
{
    public class GoodSourceListDto : EntityDto<Guid>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public string custCode { get; set; }
        public decimal? amount { get; set; }
        public string goodCode { get; set; }
        /// <summary>
        /// 商品名称
        /// </summary>
        public string goodName { get; set; }
        /// <summary>                                                                    
        /// 客户名称                                         
        /// </summary>
        public string cusName { get; set; }
    }

    public class GoodSourceListForWeChatDto: EntityDto<Guid>
    {
        /// <summary>
        /// 零售户code
        /// </summary>
        public string CustCode { get; set; }
        /// <summary>
        /// 供货量
        /// </summary>
        public decimal? Amount { get; set; }
        /// <summary>
        /// 商品Code
        /// </summary>
        public string ItemCode{ get; set; }
        /// <summary>
        /// 商品名
        /// </summary>
        public string ItemName { get; set; }
    }
}