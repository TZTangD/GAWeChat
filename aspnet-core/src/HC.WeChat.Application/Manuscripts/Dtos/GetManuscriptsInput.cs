using Abp.Runtime.Validation;
using HC.WeChat.Dto;
using HC.WeChat.Manuscripts;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.Manuscripts.Dtos
{
    public class GetManuscriptsInput : PagedAndSortedInputDto, IShouldNormalize
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        /// <summary>
        /// 模糊搜索使用的关键字
        /// </summary>
        public string Filter { get; set; }
        public string Title { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public ProcessTypeEnum? Status { get; set; }

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
