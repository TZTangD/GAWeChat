using Abp.Runtime.Validation;
using HC.WeChat.Dto;
using HC.WeChat.ActivityForms;
using System;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.ActivityForms.Dtos
{
    public class GetActivityFormsInput : PagedAndSortedInputDto, IShouldNormalize
    {
        /// <summary>
        /// 模糊搜索使用的关键字
        /// </summary>
        public string Filter { get; set; }

        public string FormCode { get; set; }

        public DateTime? BeginDate { get; set; }

        public DateTime? EndDate { get; set; }

        public DateTime? EndDateOne
        {
            get
            {
                if (EndDate.HasValue)
                {
                    return EndDate.Value.AddDays(1);
                }
                return EndDate;
            }
        }

        public FormStatusEnum? Status { get; set; }

        /// <summary>
        /// 正常化排序使用
        /// </summary>
        public void Normalize()
        {
            if (string.IsNullOrEmpty(Sorting))
            {
                Sorting = "CreationTime Desc";
            }
        }

        /// <summary>
        /// 商品规格
        /// </summary>
        public string ProductSpecification { get; set; }

        /// <summary>
        /// 收货人类型（枚举：消费者、推荐人）
        /// </summary>
        public DeliveryUserTypeEnum? UserType { get; set; }

        /// <summary>
        /// 联系方式
        /// </summary>
        public string Phone { get; set; }

        /// <summary>
        /// 是否邮寄
        /// </summary>
        public bool? IsSend { get; set; }
    }

    public class GetActivityViewInput : PagedAndSortedInputDto, IShouldNormalize
    {
        /// <summary>
        /// 区县
        /// </summary>
        public string ActivityArea { get; set; }

        /// <summary>
        /// 商品规格
        /// </summary>
        public string GoodsSpecification { get; set; }

        /// <summary>
        /// 客户经理
        /// </summary>
        public string ManagerName { get; set; }

        public DateTime? BeginDate { get; set; }

        public DateTime? EndDate { get; set; }

        public DateTime? EndDateOne
        {
            get
            {
                if (EndDate.HasValue)
                {
                    return EndDate.Value.AddDays(1);
                }
                return EndDate;
            }
        }

        /// <summary>
        /// 正常化排序使用
        /// </summary>
        public void Normalize()
        {
            if (string.IsNullOrEmpty(Sorting))
            {
                Sorting = "Area";
            }
        }
    }
    public class GetActivityFormsSentInput : PagedAndSortedInputDto
    {
        /// <summary>
        /// 模糊搜索使用的关键字
        /// </summary>
        public string Name { get; set; }

        public string FormCode { get; set; }

        public DateTime? StartTime { get; set; }

        public DateTime? EndTime { get; set; }

        public DateTime? EndDateOne
        {
            get
            {
                if (EndTime.HasValue)
                {
                    return EndTime.Value.AddDays(1);
                }
                return EndTime;
            }
        }
        /// <summary>
        /// 商品规格
        /// </summary>
        public string ProductSpecification { get; set; }

        /// <summary>
        /// 收货人类型（枚举：消费者、推荐人）
        /// </summary>
        public DeliveryUserTypeEnum? UserType { get; set; }

        /// <summary>
        /// 联系方式
        /// </summary>
        public string Phone { get; set; }

        /// <summary>
        /// 是否邮寄
        /// </summary>
        public bool? IsSend { get; set; }
        /// <summary>
        /// 区、县
        /// </summary>
        public string AreaSe{ get; set; }
    }

}
