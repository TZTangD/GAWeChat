﻿using Abp.Runtime.Validation;
using HC.WeChat.Dto;
using HC.WeChat.Retailers;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.Retailers.Dtos
{
    public class GetRetailersInput : PagedAndSortedInputDto, IShouldNormalize
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        /// <summary>
        /// 模糊搜索使用的关键字
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 经营规模
        /// </summary>
        public ScaleEnum? Scale { get; set; }
        /// <summary>
        /// 市场类型
        /// </summary>
        public MarketTypeEnum? Markets { get; set; }

        /// <summary>
        /// 状态
        /// </summary>
        public bool? Status { get; set; }

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
    public class GetRetailersWeChatInput : PagedAndSortedInputDto, IShouldNormalize
    {
        /// <summary>
        /// 专卖号或电话或姓名
        /// </summary>
        public string Filter { get; set; }
        public int? tenantId { get; set; }
        public bool IsMore { get; set; }
        public void Normalize()
        {
            if (string.IsNullOrEmpty(Sorting))
            {
                Sorting = "Id";
            }
        }
    }
}
