using System.ComponentModel.DataAnnotations;
using HC.WeChat.ActivityFormLogs.Dtos.LTMAutoMapper;
using HC.WeChat.ActivityFormLogs;
using System;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.ActivityFormLogs.Dtos
{
    public class ActivityFormLogEditDto
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public Guid? Id { get; set; }

        /// <summary>
        /// 外键 申请表单Id
        /// </summary>
        [Required]
        public Guid ActivityFormId { get; set; }


        /// <summary>
        /// 申请表单审批状态
        /// </summary>
        [Required]
        public FormStatusEnum Status { get; set; }


        /// <summary>
        /// 审批状态名称 快照
        /// </summary>
        [Required]
        public string StatusName { get; set; }


        /// <summary>
        /// 审批意见
        /// </summary>
        [StringLength(200)]
        public string Opinion { get; set; }


        /// <summary>
        /// 操作用户类型（枚举 零售客户、客户经理）
        /// </summary>
        [Required]
        public UserTypeEnum UserType { get; set; }


        /// <summary>
        /// 操作用户Id，零售用户 或  客户经理
        /// </summary>
        public Guid? UserId { get; set; }


        /// <summary>
        /// 操作用户名称
        /// </summary>
        [StringLength(50)]
        public string UserName { get; set; }


        /// <summary>
        /// 操作时间
        /// </summary>
        [Required]
        public DateTime ActionTime { get; set; }
    }
}