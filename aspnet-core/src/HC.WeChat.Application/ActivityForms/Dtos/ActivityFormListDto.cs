using System;
using Abp.Application.Services.Dto;
using HC.WeChat.ActivityForms.Dtos.LTMAutoMapper;
using HC.WeChat.ActivityForms;
using HC.WeChat.WechatEnums;
using System.Collections.Generic;
using Abp.AutoMapper;
using HC.WeChat.ActivityFormLogs;

namespace HC.WeChat.ActivityForms.Dtos
{
    [AutoMapFrom(typeof(ActivityForm))]
    public class ActivityFormListDto : EntityDto<Guid>
    {
        public string FormCode { get; set; }
        public Guid ActivityId { get; set; }
        public Guid? RetailerId { get; set; }
        public Guid? ActivityGoodsId { get; set; }
        public string GoodsSpecification { get; set; }
        public int Num { get; set; }
        public string Reason { get; set; }
        public FormStatusEnum Status { get; set; }

        public string StatusName
        {
            get
            {
                return Status.ToString();
            }
        }

        public string StatusType
        {
            get
            {
                switch (Status)
                {
                    case FormStatusEnum.提交申请:
                        return "error";
                    case FormStatusEnum.初审通过:
                        return "processing";
                    case FormStatusEnum.拒绝:
                        return "default";
                    case FormStatusEnum.资料回传已审核:
                        return "success";
                    case FormStatusEnum.营销中心已审核:
                        return "success";
                    case FormStatusEnum.取消:
                        return "default";
                    default: return "default";
                }
            }
        }

        public DateTime CreationTime { get; set; }

        public string ActivityName { get; set; }

        public string RetailerName { get; set; }

        public string ManagerName { get; set; }

        public Guid? ManagerId { get; set; }

        public string CreationUser { get; set; }

        public Guid? CreationId { get; set; }

        public List<ActivityFormLogDto> FormLogList { get; set; }

        public int CurrentStep { get; set; }
    }

    [AutoMapFrom(typeof(ActivityFormLog))]
    public class ActivityFormLogDto
    {
        public FormStatusEnum Status { get; set; }
        public string StatusName { get; set; }
        public string Opinion { get; set; }
        public UserTypeEnum UserType { get; set; }
        public string UserTypeName
        {
            get
            {
                return UserType.ToString();
            }
        }
        public string UserName { get; set; }
        public DateTime? ActionTime { get; set; }

        public string Desc
        {
            get
            {
                switch (Status)
                {
                    case FormStatusEnum.提交申请:
                        {
                            return "待审核";
                        }
                    case FormStatusEnum.初审通过:
                        {
                            return "邮寄消费者奖励";
                        }
                    case FormStatusEnum.资料回传已审核:
                        {
                            return "待营销中心审核";
                        }
                    case FormStatusEnum.营销中心已审核:
                        {
                            return "邮寄推荐人奖励";
                        }

                    default:
                        return string.Empty;
                }
            }
        }
    }

    public class ActivityViewDto
    {
        /// <summary>
        /// 区县
        /// </summary>
        public string Area { get; set; }

        /// <summary>
        /// 商品规格
        /// </summary>
        public string GoodsSpecification { get; set; }

        /// <summary>
        /// 客户经理
        /// </summary>
        public string ManagerName { get; set; }

        /// <summary>
        /// 活动开展场次
        /// </summary>
        public int OpenNum { get; set; }

        /// <summary>
        /// 申请商品数量
        /// </summary>
        public int GoodsNum { get; set; }
    }

    public class ActivityFormCountDto
    {
        /// <summary>
        /// 未完成
        /// </summary>
        public int OutstandingCount { get; set; }

        /// <summary>
        /// 已完成
        /// </summary>
        public int CompletedCount { get; set; }
    }
}