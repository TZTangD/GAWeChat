using System;
using Abp.Application.Services.Dto;
using HC.WeChat.ActivityGoodses.Dtos.LTMAutoMapper;
using HC.WeChat.ActivityGoodses;

namespace HC.WeChat.ActivityGoodses.Dtos
{
    public class ActivityGoodsListDto : FullAuditedEntityDto<Guid>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public string Specification { get; set; }
        public Guid ActivityId { get; set; }
        public int MinNum { get; set; }
        public int MaxNum { get; set; }
        public string DiscountDesc { get; set; }
    }

    public class ActivityGoodsDto
    {
        public string Specification { get; set; }
         
        public Guid Id { get; set; }
    }
}