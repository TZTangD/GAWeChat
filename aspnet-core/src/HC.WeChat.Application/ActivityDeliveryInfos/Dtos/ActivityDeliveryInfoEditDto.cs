using System.ComponentModel.DataAnnotations;
using HC.WeChat.ActivityDeliveryInfos.Dtos.LTMAutoMapper;
using HC.WeChat.ActivityDeliveryInfos;
using System;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.ActivityDeliveryInfos.Dtos
{
    public class ActivityDeliveryInfoEditDto
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
        /// 邮件消费者用户名
        /// </summary>
        [StringLength(50)]
        public string UserName { get; set; }


        /// <summary>
        /// 邮件消费者电话
        /// </summary>
        [StringLength(20)]
        public string Phone { get; set; }


        /// <summary>
        /// 邮件消费者地址
        /// </summary>
        [StringLength(500)]
        public string Address { get; set; }

        /// <summary>
        /// 收货人类型（枚举：消费者、推荐人）
        /// </summary>
        public DeliveryUserTypeEnum? Type { get; set; }

        /// <summary>
        /// 快递公司
        /// </summary>
        [StringLength(200)]
        public string ExpressCompany { get; set; }

        /// <summary>
        /// 快递单号
        /// </summary>
        [StringLength(200)]
        public string ExpressNo { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        [StringLength(500)]
        public string Remark { get; set; }

        /// <summary>
        /// 发件时间
        /// </summary>
        public DateTime? SendTime { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        [Required]
        public DateTime CreationTime { get; set; }

        public string DeliveryRemark { get; set; }

        public bool IsSend { get; set; }
    }
}