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
        /// 租户ID
        /// </summary>
        public int? TenantId { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        [Required]
        public DateTime CreationTime { get; set; }



    }
    public class MemberCodeEditDto
    {
        public Guid? RcId { get; set; }
        public Guid? CId { get; set; }
        public Guid? EId { get; set; }
        public Guid? UserId { get; set; }

        public int RcCode { get; set; }
        public int CCode { get; set; }
        public int ECode { get; set; }
        public int UserCode { get; set; }
        public string RcValue { get; set; }
        public string CValue { get; set; }
        public string EValue { get; set; }
        public string UserValue { get; set; }
    }
}