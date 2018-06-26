using Abp.Runtime.Validation;
using HC.WeChat.Dto;
using HC.WeChat.WechatEnums;
using HC.WeChat.WeChatUsers;
using System;

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
        public string Phone { get; set; }

        /// <summary>
        /// 后台会员配置指定姓名搜索
        /// </summary>
        public string UserName { get; set; }

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
        public string SortValue { get; set; }

        /// <summary>
        /// 零售户编码或内部员工编码
        /// </summary>
        public string Code { get; set; }

    }

    /// <summary>
    /// 店员搜索条件
    /// </summary>
    public class GetShopWeChatUsersInput : PagedAndSortedInputDto, IShouldNormalize
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        /// <summary>
        /// 模糊搜索使用的关键字
        /// </summary>
        public string Name { get; set; }
        public Guid? ShopOwnerId { get; set; }
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
