using System.ComponentModel.DataAnnotations;
using HC.WeChat.Manuscripts.Dtos.LTMAutoMapper;
using HC.WeChat.Manuscripts;
using System;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.Manuscripts.Dtos
{
    public class ManuscriptEditDto
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public Guid? Id { get; set; }
        public ArticleTypeEnum? Type { get; set; }


        /// <summary>
        /// 投稿主题
        /// </summary>
        [Required]
        [StringLength(200)]
        public string Title { get; set; }
        public string Content { get; set; }


        /// <summary>
        /// 用户姓名
        /// </summary>
        [StringLength(50)]
        public string UserName { get; set; }


        /// <summary>
        /// 联系电话
        /// </summary>
        [StringLength(20)]
        public string Phone { get; set; }


        /// <summary>
        /// 微信openId
        /// </summary>
        [StringLength(50)]
        public string OpenId { get; set; }
        public ProcessTypeEnum? Status { get; set; }
        public int? TenantId { get; set; }


        /// <summary>
        /// CreationTime
        /// </summary>
        public DateTime CreationTime { get; set; }

        /// <summary>
        /// 处理时间
        /// </summary>
        public DateTime? DealWithTime { get; set; }

        /// <summary>
        /// 处理状态名字
        /// </summary>
        public string StatusName
        {
            get
            {
                return Status.ToString();
            }
        }
        public string TypeName
        {
            get
            {
                return Type.ToString();
            }
        }
    }
}