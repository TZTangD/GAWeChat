using System.ComponentModel.DataAnnotations;
using HC.WeChat.ActivityForms.Dtos.LTMAutoMapper;
using HC.WeChat.ActivityForms;
using System;
using HC.WeChat.WechatEnums;
using Abp.AutoMapper;
using HC.WeChat.ActivityDeliveryInfos;
using Abp.Application.Services.Dto;
using HC.WeChat.Dto;

namespace HC.WeChat.ActivityForms.Dtos
{
    public class ActivityFormEditDto
    {
        public Guid? Id { get; set; }

        /// <summary>
        /// 申请单号（系统自动生成AF+算法规则）唯一
        /// </summary>
        [Required]
        [StringLength(50)]
        public string FormCode { get; set; }


        /// <summary>
        /// 活动Id，外键
        /// </summary>
        [Required]
        public Guid ActivityId { get; set; }


        /// <summary>
        /// 零售户Id， 外键
        /// </summary>
        public Guid? RetailerId { get; set; }


        /// <summary>
        /// 申请商品Id，外键
        /// </summary>
        public Guid? ActivityGoodsId { get; set; }


        /// <summary>
        /// 申请商品规格 快照
        /// </summary>
        [StringLength(200)]
        public string GoodsSpecification { get; set; }


        /// <summary>
        /// 申请数量（需要做最大最小限制）
        /// </summary>
        [Required]
        public int Num { get; set; }


        /// <summary>
        /// 申请理由
        /// </summary>
        [Required]
        public string Reason { get; set; }


        /// <summary>
        /// 审批状态（枚举 提交申请（不可更改）、
        /// 初审通过（营销中心邮寄消费者奖励，办事完成可回传照片完善资料）、
        /// 最终状态（拒绝、取消（申请人才可取消）、
        /// 完成/审核通过（完善资料审核通过，可邮寄推荐人奖励））
        /// </summary>
        [Required]
        public FormStatusEnum Status { get; set; }


        /// <summary>
        /// 创建时间
        /// </summary>
        [Required]
        public DateTime CreationTime { get; set; }

        public string ActivityName { get; set; }

        public string RetailerName { get; set; }

        public string ManagerName { get; set; }

        public Guid? ManagerId { get; set; }

        public Guid? CreationId { get; set; }

        [StringLength(50)]
        public string CreationUser { get; set; }

        //public ICollection<ActivityBanquet> Banquet { get; set; }

        /// <summary>
        /// 活动邮件信息
        /// </summary>
        //public ICollection<ActivityDeliveryInfo> DeliveryInfo { get; set; }

        /// <summary>
        /// 活动审批日志
        /// </summary>
        //public  ICollection<ActivityFormLog> ApprovalLogs { get; set; }
    }

    [AutoMapTo(typeof(ActivityForm), typeof(ActivityDeliveryInfo))]
    public class ActivityFormInputDto : WeChatInputDto
    {
        /// <summary>
        /// 活动Id，外键
        /// </summary>
        public Guid ActivityId { get; set; }


        /// <summary>
        /// 申请商品Id，外键
        /// </summary>
        public Guid? ActivityGoodsId { get; set; }


        /// <summary>
        /// 申请商品规格 快照
        /// </summary>
        [StringLength(200)]
        public string GoodsSpecification { get; set; }


        /// <summary>
        /// 申请数量（需要做最大最小限制）
        /// </summary>
        [Required]
        public int Num { get; set; }


        /// <summary>
        /// 申请理由
        /// </summary>
        [Required]
        public string Reason { get; set; }

        public string UserName { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string DeliveryRemark { get; set; }
    }

    [AutoMapTo(typeof(ActivityForm))]
    public class ActivityFormStatusDto : EntityDto<Guid>
    {
        public FormStatusEnum Status { get; set; }

        public string Opinion { get; set; }
    }
    [AutoMapTo(typeof(ActivityForm))]
    public class ActivityFromStatusDtoss : EntityDto<Guid>
    {
        public FormStatusEnum Status { get; set; }

        public string Opinion { get; set; }
        public string OpenId { get; set; }

        public int? TenantId { get; set; }
    }
}