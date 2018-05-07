using System.ComponentModel.DataAnnotations;
using HC.WeChat.Activities.Dtos.LTMAutoMapper;
using HC.WeChat.Activities;
using System;
using HC.WeChat.WechatEnums;
using Abp.Application.Services.Dto;
using HC.WeChat.WechatMessages;
using Abp.AutoMapper;

namespace HC.WeChat.Activities.Dtos
{
    [AutoMapTo(typeof(Activity))]
    public class ActivityEditDto: FullAuditedEntityDto<Guid?>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        //public Guid? Id { get; set; }

        /// <summary>
        /// 活动名称
        /// </summary>
        [Required]
        [StringLength(200)]
        public string Name { get; set; }


        /// <summary>
        /// 活动开始时间
        /// </summary>
        [Required]
        public DateTime BeginTime { get; set; }


        /// <summary>
        /// 活动结束时间
        /// </summary>
        [Required]
        public DateTime EndTime { get; set; }


        /// <summary>
        /// 活动分类（办事用烟）数据库可维护
        /// </summary>
        [Required]
        public ActivityTypeEnum ActivityType { get; set; }


        /// <summary>
        /// 活动内容（活动商品，优惠信息和规则）（html页面前端显示）
        /// </summary>
        [Required]
        public string Content { get; set; }
        public int? MUnfinished { get; set; }
        public int? RUnfinished { get; set; }
        public int? TenantId { get; set; }
        public DateTime? PublishTime { get; set; }


        /// <summary>
        /// 活动状态(枚举 草稿、已发布（已发布也可修改活动信息)
        /// </summary>
        [Required]
        public ActivityStatusEnum Status { get; set; }
        public string StatusName
        {
            get
            {
                return Status.ToString();
            }
        }
    }
}