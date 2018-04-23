using Abp.Runtime.Validation;
using HC.WeChat.Dto;
using HC.WeChat.Activities;
using System;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.Activities.Dtos
{
    public class GetActivitysInput : PagedAndSortedInputDto, IShouldNormalize
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        /// <summary>
        /// 模糊搜索使用的关键字 活动名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 开始时间
        /// </summary>
        public DateTime? StartTime { get; set; }
        /// <summary>
        /// 开始时间
        /// </summary>
        public DateTime? EndTime { get; set; }
        /// <summary>
        /// 结束时间
        /// </summary>
        public DateTime? EndTimeAddOne
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
        /// 活动类型
        /// </summary>
        public ActivityTypeEnum? Type { get; set; }
        /// <summary>
        /// 活动状态
        /// </summary>
        public ActivityStatusEnum? Status { get; set; }

        /// <summary>
        /// 正常化排序使用
        /// </summary>
        public void Normalize()
        {
            if (string.IsNullOrEmpty(Sorting))
            {
                Sorting = "Id";
            }
        }

    }
}
