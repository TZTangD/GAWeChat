using System.ComponentModel.DataAnnotations;
using HC.WeChat.UserAnswers.Dtos.LTMAutoMapper;
using HC.WeChat.UserAnswers;
using System;

namespace HC.WeChat.UserAnswers.Dtos
{
    public class UserAnswerEditDto
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public Guid? Id { get; set; }
        /// <summary>
        /// 外键
        /// </summary>
        [Required]
        public Guid UserQuestionId { get; set; }
        public int? AnswerSqe { get; set; }


        /// <summary>
        /// 回答内容（多选逗号分隔）
        /// </summary>
        [StringLength(500)]
        public string Content { get; set; }
    }
}