using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using HC.WeChat.ActivityDeliveryInfos.Dtos;
using HC.WeChat.WechatEnums;
using System;
using System.Collections.Generic;
using System.Text;

namespace HC.WeChat.ActivityForms.Dtos
{
  public  class PostInfoDto
    {
        /// <summary>
        /// 单号
        /// </summary>
        public string FormCode { get; set; }
        /// <summary>
        /// 区、县
        /// </summary>
        public string Area { get; set; }

        /// <summary>
        /// 申请商品规格 快照
        /// </summary>
        public string GoodsSpecification { get; set; }

        /// <summary>
        /// 申请数量（需要做最大最小限制）
        /// </summary>
        public int Num { get; set; }

        /// <summary>
        /// 活动申请单申请时间
        /// </summary>
        public DateTime ApplyTime { get { return CreationTime;  } }

        public DateTime CreationTime { get; set; }

        /// <summary>
        /// 用户类型中文显示
        /// </summary>
        public string TypeName
        {
            get
            {
                return Type.ToString();
            }
        }
        public Guid Id { get; set; }
        public Guid ActivityFormId { get; set; }
        public string UserName { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        /// <summary>
        /// 收货人类型（枚举：消费者、推荐人）
        /// </summary>
        public DeliveryUserTypeEnum? Type { get; set; }
        /// <summary>
        /// 发件时间
        /// </summary>
        public DateTime? SendTime { get; set; }
        public bool IsSend { get; set; }
    }

    public class PostInfoDtoToExcel 
    {
        /// <summary>
        /// 单号
        /// </summary>
        public string FormCode { get; set; }
        /// <summary>
        /// 区、县
        /// </summary>
        public string Area { get; set; }

        /// <summary>
        /// 申请商品规格 快照
        /// </summary>
        public string GoodsSpecification { get; set; }

        /// <summary>
        /// 申请数量（需要做最大最小限制）
        /// </summary>
        public int Num { get; set; }


        public DateTime CreationTime { get; set; }

        /// <summary>
        /// 用户类型中文显示
        /// </summary>
        public string TypeName
        {
            get
            {
                if (Type.HasValue)
                {
                    return Type.ToString();
                }
                return string.Empty;
            }
        }

        public string UserName { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }

        public DeliveryUserTypeEnum? Type { get; set; }

        public bool? IsSend { get; set; }
 
        public string IsSendName
        {
            get
            {
                if (IsSend.HasValue)
                {
                    return IsSend == true ? "是" : "否";
                }
                return string.Empty;
            }
        }

        public string TUserName { get; set; }
        public string TPhone { get; set; }
        public string TAddress { get; set; }

        public bool? TIsSend { get; set; }
        public string TIsSendName
        {
            get
            {
                if (TIsSend.HasValue)
                {
                    return TIsSend == true ? "是" : "否";
                }
                return string.Empty;
            }
        }
     
        public string Reason { get; set; }
        public FormStatusEnum Status { get; set; }

        public string StatusName
        {
            get
            {
                return Status.ToString();
            }
        }
        public string ActivityName { get; set; }

        public string RetailerName { get; set; }

        public string ManagerName { get; set; }
    }

}
