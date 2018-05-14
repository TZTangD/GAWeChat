using System;
using Abp.Application.Services.Dto;
using HC.WeChat.WeChatUsers.Dtos.LTMAutoMapper;
using HC.WeChat.WeChatUsers;
using HC.WeChat.WechatEnums;
using Abp.AutoMapper;

namespace HC.WeChat.WeChatUsers.Dtos
{
    [AutoMapFrom(typeof(WeChatUser))]//只匹配查询（与存在的字段相匹配）
    public class WeChatUserListDto : EntityDto<Guid>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public string NickName { get; set; }
        public string OpenId { get; set; }
        public UserTypeEnum UserType { get; set; }
        public Guid? UserId { get; set; }
        public string UserName { get; set; }
        public BindStatusEnum BindStatus { get; set; }
        public DateTime? BindTime { get; set; }
        public int? TenantId { get; set; }
        public DateTime? UnBindTime { get; set; }

        private string _headImgUrl;
        public string HeadImgUrl
        {
            get
            {
                if (string.IsNullOrEmpty(_headImgUrl))
                {
                    return @"./assets/images/timg-4.jpeg";
                }
                return _headImgUrl;
            }
            set
            {
                _headImgUrl = value;
            }
        }

        public string UserTypeName
        {
            get
            {
                return UserType.ToString();
            }
        }
        public string BindStatusName
        {
            get
            {
                return BindStatus.ToString();
            }
        }

        public string Phone { get; set; }

        public string MemberBarCode { get; set; }

        public int IntegralTotal { get; set; }

        public bool? IsShopkeeper { get; set; }

        public UserAuditStatus? Status { get; set; }

        public string StatusName
        {
            get
            {
                return Status.ToString();
            }
        }
    }
}