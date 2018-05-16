using System;
using Abp.Application.Services.Dto;
using HC.WeChat.EPCos.Dtos.LTMAutoMapper;
using HC.WeChat.EPCos;

namespace HC.WeChat.EPCos.Dtos
{
    public class EPCoListDto : EntityDto<Guid>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public string CO_NUM { get; set; }
        public string CUST_ID { get; set; }
        public string SLSMAN_ID { get; set; }
        public string POSE_DATE { get; set; }
        public decimal? QTY_SUM { get; set; }
        public decimal? AMT_SUM { get; set; }
    }
}