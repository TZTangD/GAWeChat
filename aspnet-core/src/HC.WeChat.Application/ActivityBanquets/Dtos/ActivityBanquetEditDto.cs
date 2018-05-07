using System.ComponentModel.DataAnnotations;
using HC.WeChat.ActivityBanquets.Dtos.LTMAutoMapper;
using HC.WeChat.ActivityBanquets;
using System;
using Abp.AutoMapper;
using HC.WeChat.ActivityDeliveryInfos;
using HC.WeChat.Dto;

namespace HC.WeChat.ActivityBanquets.Dtos
{
    public class ActivityBanquetEditDto
    {
        public Guid? Id { get; set; }

        /// <summary>
        /// 外键 申请表单Id
        /// </summary>
        [Required]
        public Guid ActivityFormId { get; set; }


        /// <summary>
        /// 区县
        /// </summary>
        [Required]
        public string Area { get; set; }


        /// <summary>
        /// 责任人 （客户经理）快照
        /// </summary>
        [StringLength(50)]
        public string Responsible { get; set; }


        /// <summary>
        /// 执行人 （零售用户）快照
        /// </summary>
        [StringLength(50)]
        public string Executor { get; set; }


        /// <summary>
        /// 宴席时间
        /// </summary>
        [Required]
        public DateTime BanquetTime { get; set; }


        /// <summary>
        /// 宴席地点
        /// </summary>
        [Required]
        [StringLength(500)]
        public string Position { get; set; }


        /// <summary>
        /// 现场人数
        /// </summary>
        [Required]
        public int Num { get; set; }


        /// <summary>
        /// 现场简述
        /// </summary>
        [Required]
        [StringLength(500)]
        public string Desc { get; set; }


        /// <summary>
        /// 现场图片不得少于4张
        /// </summary>
        public string PhotoUrl { get; set; }


        /// <summary>
        /// 创建时间
        /// </summary>
        [Required]
        public DateTime CreationTime { get; set; }


        /// <summary>
        /// 创建用户名 快照
        /// </summary>
        [StringLength(50)]
        public string UserName { get; set; }

    }

    [AutoMap(typeof(ActivityBanquet), typeof(ActivityDeliveryInfo))]
    public class ActivityBanquetWeChatDto : WeChatInputDto
    {
        /// <summary>
        /// 宴席资料Id
        /// </summary>
        public Guid? BanquetId { get; set; }

        /// <summary>
        /// 推荐人信息Id
        /// </summary>
        public Guid? DeliveryId { get; set; }

        /// <summary>
        /// 外键 申请表单Id
        /// </summary>
        [Required]
        public Guid ActivityFormId { get; set; }


        /// <summary>
        /// 区县
        /// </summary>
        [Required]
        public string Area { get; set; }


        /// <summary>
        /// 宴席时间
        /// </summary>
        public DateTime BanquetTime { get; set; }

        public string ShowBanquetTime
        {
            get
            {
                if (BanquetId.HasValue)
                {
                    return BanquetTime.ToString("yyyy-MM-dd");
                }
                return null;
            }
        }

        /// <summary>
        /// 宴席地点
        /// </summary>
        [Required]
        [StringLength(500)]
        public string Position { get; set; }


        /// <summary>
        /// 现场人数
        /// </summary>
        [Required]
        public int Num { get; set; }


        /// <summary>
        /// 现场简述
        /// </summary>
        [Required]
        [StringLength(500)]
        public string Desc { get; set; }


        /// <summary>
        /// 现场图片不得少于4张
        /// </summary>
        public string PhotoUrl { get; set; }


        public string UserName { get; set; }

        public string Phone { get; set; }

        public string Address { get; set; }

        public string DeliveryRemark { get; set; }

        public string AppId { get; set; }


    }
}