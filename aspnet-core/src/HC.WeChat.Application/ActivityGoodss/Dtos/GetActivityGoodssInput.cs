using Abp.Runtime.Validation;
using HC.WeChat.Dto;
using HC.WeChat.ActivityGoodses;
using System;

namespace HC.WeChat.ActivityGoodses.Dtos
{
    public class GetActivityGoodsesInput : PagedAndSortedInputDto, IShouldNormalize
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        /// <summary>
        /// 模糊搜索使用的关键字
        /// </summary>
        public string Filter { get; set; }
        /// <summary>
        /// 活动id
        /// </summary>
        public Guid? AvtivityId { get; set; }
        /// <summary>
        /// 模糊查询
        /// </summary>
        public string SearchName { get; set; }

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
