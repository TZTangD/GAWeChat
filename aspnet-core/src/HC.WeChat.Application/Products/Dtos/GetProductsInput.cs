using Abp.Runtime.Validation;
using HC.WeChat.Dto;
using HC.WeChat.Products;
using HC.WeChat.WechatEnums;
using System;

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

        public string SortValue { get; set; }
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

    public class CheckInput
    {
        /// <summary>
        /// 包码
        /// </summary>
        public string PCode { get; set; }
        /// <summary>
        /// 条码
        /// </summary>
        public string BCode { get; set; }
        /// <summary>
        /// 商品Id
        /// </summary>
        public Guid? ProductId { get; set; }
    }

    public class WechatImgBase64
    {
        public string fileName { get; set; }

        public string imageBase64 { get; set; }
    }
}
