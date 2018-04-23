using System;
using Abp.Application.Services.Dto;
using HC.WeChat.ActivityBanquets.Dtos.LTMAutoMapper;
using HC.WeChat.ActivityBanquets;

namespace HC.WeChat.ActivityBanquets.Dtos
{
    public class ActivityBanquetListDto : EntityDto<Guid>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public Guid ActivityFormId { get; set; }
        public string Area { get; set; }
        public string Responsible { get; set; }
        public string Executor { get; set; }
        public DateTime BanquetTime { get; set; }
        public string Position { get; set; }
        public int Num { get; set; }
        public string Desc { get; set; }
        public string PhotoUrl { get; set; }
        public DateTime CreationTime { get; set; }
        public string UserName { get; set; }
    }
}