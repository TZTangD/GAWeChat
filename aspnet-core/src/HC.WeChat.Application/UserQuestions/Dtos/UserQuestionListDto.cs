using System;
using Abp.Application.Services.Dto;
using HC.WeChat.UserQuestions.Dtos.LTMAutoMapper;
using HC.WeChat.UserQuestions;
using Abp.AutoMapper;
using HC.WeChat.UserAnswers;
using System.Collections.Generic;

namespace HC.WeChat.UserQuestions.Dtos
{
    public class UserQuestionListDto : EntityDto<Guid>
    {
        public string Name { get; set; }
        public string UserName { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string OpenId { get; set; }
        public int? TenantId { get; set; }
        public DateTime CreationTime { get; set; }
    }

    [Serializable]
    [AutoMapTo(typeof(UserAnswer))]
    public class UserAnswerDto 
    {
        public Guid UserQuestionId { get; set; }
        public int? AnswerSqe { get; set; }
        public string Content { get; set; }
    }

    [Serializable]
    [AutoMapTo(typeof(UserQuestion))]
    public class UserQuestionDto
    {
        public string Name { get; set; }
        public string UserName { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string OpenId { get; set; }
        public int? TenantId { get; set; }

        public List<UserAnswerDto> UserAnswerList { get; set; }
    }
}