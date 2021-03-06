﻿using System;
using Abp.Application.Services.Dto;
using HC.WeChat.MemberConfigs.Dtos.LTMAutoMapper;
using HC.WeChat.MemberConfigs;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.MemberConfigs.Dtos
{
    public class MemberConfigListDto : EntityDto<Guid>
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public DeployTypeEnum? Type { get; set; }
        public DeployCodeEnum? Code { get; set; }
        public string Value { get; set; }
        public DateTime CreationTime { get; set; }

        public string Desc { get; set; }
        /// <summary>
        /// 租户ID
        /// </summary>
        public int? TenantId { get; set; }
    }
}