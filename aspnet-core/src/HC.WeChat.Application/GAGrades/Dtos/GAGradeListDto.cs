using System;
using Abp.Application.Services.Dto;
using HC.WeChat.GAGrades.Dtos.LTMAutoMapper;
using HC.WeChat.GAGrades;

namespace HC.WeChat.GAGrades.Dtos
{
    public class GAGradeListDto : EntityDto<int>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public int GradeLevel { get; set; }
        public int StartPoint { get; set; }
    }
}