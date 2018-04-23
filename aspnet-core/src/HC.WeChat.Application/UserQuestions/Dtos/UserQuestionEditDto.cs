using System.ComponentModel.DataAnnotations;
using HC.WeChat.UserQuestions.Dtos.LTMAutoMapper;
using HC.WeChat.UserQuestions;
using System;

namespace HC.WeChat.UserQuestions.Dtos
{
    public class UserQuestionEditDto
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public Guid? Id { get; set; }
        /// <summary>
        /// 问题名称
        /// </summary>
        [Required]
        [StringLength(500)]
        public string Name { get; set; }


        /// <summary>
        /// 客户姓名
        /// </summary>
        [StringLength(50)]
        public string UserName { get; set; }


        /// <summary>
        /// 电话号码
        /// </summary>
        [StringLength(11)]
        public string Phone { get; set; }


        /// <summary>
        /// 地址
        /// </summary>
        [StringLength(500)]
        public string Address { get; set; }


        /// <summary>
        /// 微信OpenId
        /// </summary>
        [StringLength(50)]
        public string OpenId { get; set; }
        public int? TenantId { get; set; }


        /// <summary>
        /// 创建时间
        /// </summary>
        [Required]
        public DateTime CreationTime { get; set; }
    }
}