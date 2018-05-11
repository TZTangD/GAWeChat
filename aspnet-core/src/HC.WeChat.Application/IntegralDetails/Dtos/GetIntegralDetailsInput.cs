using Abp.Runtime.Validation;
using HC.WeChat.Dto;
using HC.WeChat.IntegralDetails;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.IntegralDetails.Dtos
{
    public class GetIntegralDetailsInput : PagedAndSortedInputDto, IShouldNormalize
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        /// <summary>
        /// 模糊搜索使用的关键字
        /// </summary>
        public string Filter { get; set; }
        public string OpenId { get; set; }

        public UserTypeEnum? UserType { get; set; }

        public string Phone { get; set; }

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
