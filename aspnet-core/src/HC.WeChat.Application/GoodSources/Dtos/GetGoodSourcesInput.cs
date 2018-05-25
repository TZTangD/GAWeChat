using Abp.Runtime.Validation;
using HC.WeChat.Dto;
using HC.WeChat.GoodSources;
using System;

namespace HC.WeChat.GoodSources.Dtos
{
    public class GetGoodSourcesInput : PagedAndSortedInputDto, IShouldNormalize
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        /// <summary>
        /// 模糊搜索使用的关键字
        /// </summary>
        public string Filter { get; set; }
        public string CustCode { get; set; }
        public int? tenantId { get; set; }
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
