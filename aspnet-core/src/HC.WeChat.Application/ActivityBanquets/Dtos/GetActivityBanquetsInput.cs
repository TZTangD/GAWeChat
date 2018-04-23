using Abp.Runtime.Validation;
using HC.WeChat.Dto;
using HC.WeChat.ActivityBanquets;

namespace HC.WeChat.ActivityBanquets.Dtos
{
    public class GetActivityBanquetsInput : PagedAndSortedInputDto, IShouldNormalize
    {
        /// <summary>
        /// 模糊搜索使用的关键字
        /// </summary>
        public string Filter { get; set; }

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
