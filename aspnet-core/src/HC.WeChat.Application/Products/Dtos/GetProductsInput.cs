using Abp.Runtime.Validation;
using HC.WeChat.Dto;
using HC.WeChat.Products;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.Products.Dtos
{
    public class GetProductsInput : PagedAndSortedInputDto, IShouldNormalize
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        /// <summary>
        /// 模糊搜索使用的关键字
        /// </summary>
        public string Filter { get; set; }
        public string Name { get; set; }
        public ProductTypeEnum? Type { get; set; }
        public bool? IsRare { get; set; }
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
