using Abp.Runtime.Validation;
using HC.WeChat.Dto;
using HC.WeChat.WechatEnums;
using HC.WeChat.WeChatUsers;

namespace HC.WeChat.WeChatUsers.Dtos
{
    public class GetWeChatUsersInput : PagedAndSortedInputDto, IShouldNormalize
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        /// <summary>
        /// 模糊搜索使用的关键字
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 用户类型
        /// </summary>
        public UserTypeEnum? UserType { get; set; }

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
