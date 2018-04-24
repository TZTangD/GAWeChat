using System.ComponentModel.DataAnnotations;
using HC.WeChat.MemberConfigs.Dtos.LTMAutoMapper;
using HC.WeChat.MemberConfigs;
using HC.WeChat.WechatEnums;
using System;

namespace HC.WeChat.MemberConfigs.Dtos
{
    public class MemberConfigEditDto
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public Guid? Id { get; set; }
        public DeployTypeEnum? Type { get; set; }
        public DeployCodeEnum? Code { get; set; }
        public string Value { get; set; }


        /// <summary>
        /// 创建时间
        /// </summary>
        [Required]
        public DateTime CreationTime { get; set; }
    }
}