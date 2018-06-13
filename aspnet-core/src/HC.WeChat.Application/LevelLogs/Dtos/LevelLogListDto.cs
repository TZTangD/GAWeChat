using System;
using Abp.Application.Services.Dto;
using HC.WeChat.LevelLogs.Dtos.LTMAutoMapper;
using HC.WeChat.LevelLogs;
using System.Collections.Generic;

namespace HC.WeChat.LevelLogs.Dtos
{
    public class LevelLogListDto : EntityDto<Guid>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public string LevelData { get; set; }
        public DateTime? ChangeTime { get; set; }
    }
}