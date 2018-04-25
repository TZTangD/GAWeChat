using System.ComponentModel.DataAnnotations;
using HC.WeChat.Articles.Dtos.LTMAutoMapper;
using HC.WeChat.Articles;
using System;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.Articles.Dtos
{
    public class ArticleEditDto
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public Guid? Id { get; set; }

        /// <summary>
        /// 标题
        /// </summary>
        [Required]
        [StringLength(200)]
        public string Title { get; set; }


        /// <summary>
        /// 作者
        /// </summary>
        [Required]
        [StringLength(50)]
        public string Author { get; set; }
        /// <summary>
        /// 文章类型（枚举：营销活动、经验分享）
        /// </summary>
        public ArticleTypeEnum? Type { get; set; }

        /// <summary>
        /// 封面图片
        /// </summary>
        [Required]
        [StringLength(500)]
        public string CoverPhoto { get; set; }
        public string Content { get; set; }
        public int? ReadTotal { get; set; }
        public int? GoodTotal { get; set; }
        public int? TenantId { get; set; }
        public virtual ArticlePushStatusEnum? PushStatus { get; set; }
    }
}