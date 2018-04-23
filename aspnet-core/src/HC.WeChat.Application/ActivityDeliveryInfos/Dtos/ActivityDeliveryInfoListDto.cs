using System;
using Abp.Application.Services.Dto;
using HC.WeChat.ActivityDeliveryInfos.Dtos.LTMAutoMapper;
using HC.WeChat.ActivityDeliveryInfos;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.ActivityDeliveryInfos.Dtos
{
    public class ActivityDeliveryInfoListDto : EntityDto<Guid>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public Guid ActivityFormId { get; set; }
        public string UserName { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }

        /// <summary>
        /// 收货人类型（枚举：消费者、推荐人）
        /// </summary>
        public DeliveryUserTypeEnum? Type { get; set; }

        /// <summary>
        /// 快递公司
        /// </summary>
        public string ExpressCompany { get; set; }

        /// <summary>
        /// 快递单号
        /// </summary>
        public string ExpressNo { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        public string Remark { get; set; }

        /// <summary>
        /// 发件时间
        /// </summary>
        public DateTime? SendTime { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreationTime { get; set; }

        public string DeliveryRemark { get; set; }


        public bool IsSend { get; set; }
    }
}