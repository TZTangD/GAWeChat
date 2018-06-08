using System.ComponentModel.DataAnnotations;
using HC.WeChat.Articles.Dtos.LTMAutoMapper;
using HC.WeChat.Articles;
using System;
using HC.WeChat.WechatEnums;
using Abp.Domain.Entities.Auditing;
using Abp.AutoMapper;

namespace HC.WeChat.Articles.Dtos
{
    [AutoMapTo(typeof(Article))]
    public class ArticleEditDto : FullAuditedEntity<Guid?>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        //public Guid? Id { get; set; }

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
        [StringLength(500)]
        public string CoverPhoto { get; set; }
        public string Content { get; set; }
        public int? ReadTotal { get; set; }
        public int? GoodTotal { get; set; }
        public int? TenantId { get; set; }
        public ArticlePushStatusEnum? PushStatus { get; set; }
        public DateTime? PushTime { get; set; }

        public ArticleLinkTypeEnum? LinkType { get; set; }


        public string PushStatusName
        {
            get
            {
                return PushStatus.ToString();
            }
        }
    }
}