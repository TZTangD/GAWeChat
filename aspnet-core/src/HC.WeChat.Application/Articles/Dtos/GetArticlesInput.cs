using Abp.Runtime.Validation;
using HC.WeChat.Dto;
using HC.WeChat.Articles;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.Articles.Dtos
{
    public class GetArticlesInput : PagedAndSortedInputDto, IShouldNormalize
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        /// <summary>
        /// 模糊搜索使用的关键字
        /// </summary>
        public string Filter { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public ArticlePushStatusEnum? Status { get; set; }
        /// <summary>
        /// 文章类型
        /// </summary>
        public ArticleTypeEnum? Type { get; set; }
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
