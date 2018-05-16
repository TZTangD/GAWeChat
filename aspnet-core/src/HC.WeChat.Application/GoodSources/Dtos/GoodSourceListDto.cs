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
    }
}