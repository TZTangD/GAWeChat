using Abp.Runtime.Validation;
using HC.WeChat.Dto;
using HC.WeChat.Employees;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.Employees.Dtos
{
    public class GetEmployeesInput : PagedAndSortedInputDto, IShouldNormalize
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        /// <summary>
        /// 模糊搜索使用的关键字--姓名+编码
        /// </summary>
        public string Filter { get; set; }
        /// <summary>
        /// 是否只查询经理级的员工信息
        /// </summary>
        public bool IsManger { get; set; }

        /// <summary>
        /// 职位
        /// </summary>
        public UserTypeEnum? Position { get; set; }

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
