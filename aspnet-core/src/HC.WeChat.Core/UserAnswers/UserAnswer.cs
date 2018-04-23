using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace HC.WeChat.UserAnswers
{
    /// <summary>
    /// 问卷调查回答表
    /// </summary>
    [Table("UserAnswers")]
    public class UserAnswer : Entity<Guid>
    {
        /// <summary>
        /// 外键
        /// </summary>
        [Required]
        public virtual Guid UserQuestionId { get; set; }

        /// <summary>
        /// 问题序号
        /// </summary>
        public virtual int? AnswerSqe { get; set; }

        /// <summary>
        /// 回答内容（多选逗号分隔）
        /// </summary>
        [StringLength(500)]
        public virtual string Content { get; set; }
    }
}
