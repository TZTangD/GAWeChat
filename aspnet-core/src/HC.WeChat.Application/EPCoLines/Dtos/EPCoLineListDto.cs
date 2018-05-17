using System;
using Abp.Application.Services.Dto;
using HC.WeChat.EPCoLines.Dtos.LTMAutoMapper;
using HC.WeChat.EPCoLines;

namespace HC.WeChat.EPCoLines.Dtos
{
    public class EPCoLineListDto : EntityDto<Guid>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public string CO_NUM { get; set; }
        public int LINE_NUM { get; set; }
        public string ITEM_ID { get; set; }
        public string UM_ID { get; set; }
        public decimal? QTY_NEED { get; set; }
        public decimal? QTY_VFY { get; set; }
        public decimal? QTY_ORD { get; set; }
        public decimal? PRI { get; set; }
        public decimal? PRI3 { get; set; }
        public decimal? AMT { get; set; }
    }
}