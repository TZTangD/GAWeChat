using System.ComponentModel.DataAnnotations;
using HC.WeChat.Advises.Dtos.LTMAutoMapper;
using HC.WeChat.Advises;
using System;

namespace HC.WeChat.Advises.Dtos
{
    public class AdviseEditDto
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public Guid? Id { get; set; }

        /// <summary>
        /// 标题
        /// </summary>
        [Required]
        [StringLength(500)]
        public string Title { get; set; }


        /// <summary>
        /// 用户类型名称
        /// </summary>
        [Required]
        [StringLength(50)]
        public string UserTypeName { get; set; }


        /// <summary>
        /// 微信OpenId
        /// </summary>
        [StringLength(50)]
        public string OpenId { get; set; }


        /// <summary>
        /// 联系电话
        /// </summary>
        [StringLength(11)]
        public string Phone { get; set; }


        /// <summary>
        /// 举报内容
        /// </summary>
        [StringLength(500)]
        public string Content { get; set; }


        /// <summary>
        /// 上传图片
        /// </summary>
        [StringLength(2000)]
        public string PhotoUrl { get; set; }
        public int? TenantId { get; set; }


        /// <summary>
        /// 创建时间
        /// </summary>
        [Required]
        public DateTime CreationTime { get; set; }
    }
}