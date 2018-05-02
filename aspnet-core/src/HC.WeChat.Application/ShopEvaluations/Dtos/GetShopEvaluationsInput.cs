using Abp.Runtime.Validation;
using HC.WeChat.Dto;
using HC.WeChat.ShopEvaluations;
using HC.WeChat.WechatEnums;
using System;

namespace HC.WeChat.ShopEvaluations.Dtos
{
    public class GetShopEvaluationsInput : PagedAndSortedInputDto, IShouldNormalize
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        /// <summary>
        /// 模糊搜索使用的关键字
        /// </summary>
        public string Filter { get; set; }
        /// <summary>
        /// 店铺Id
        /// </summary>
        public Guid? ShopId { get; set; }
        /// <summary>
        /// 评价等级
        /// </summary>
        public ScoreLevelEmun? Evaluation { get; set; }
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
