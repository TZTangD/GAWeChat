using System;
using Abp.Application.Services.Dto;
using HC.WeChat.GACustPoints.Dtos.LTMAutoMapper;
using HC.WeChat.GACustPoints;

namespace HC.WeChat.GACustPoints.Dtos
{
    public class GACustPointListDto : EntityDto<Guid>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public string CustId { get; set; }
        public string Pmonth { get; set; }
        public int Point { get; set; }
        public int Level { get; set; }
    }
}