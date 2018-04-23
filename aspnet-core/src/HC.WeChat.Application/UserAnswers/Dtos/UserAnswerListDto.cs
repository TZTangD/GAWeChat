using System;
using Abp.Application.Services.Dto;
using HC.WeChat.UserAnswers.Dtos.LTMAutoMapper;
using HC.WeChat.UserAnswers;

namespace HC.WeChat.UserAnswers.Dtos
{
    public class UserAnswerListDto : EntityDto<Guid>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public Guid UserQuestionId { get; set; }
        public int? AnswerSqe { get; set; }
        public string Content { get; set; }
    }
}