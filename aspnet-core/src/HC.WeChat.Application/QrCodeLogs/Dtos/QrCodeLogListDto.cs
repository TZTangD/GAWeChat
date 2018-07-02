using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.QrCodeLogs;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.QrCodeLogs.Dtos
{
    public class QrCodeLogListDto : CreationAuditedEntityDto<Guid>
    {

        /// <summary>
        /// AttentionTime
        /// </summary>
        [Required(ErrorMessage = "AttentionTime不能为空")]
        public DateTime AttentionTime { get; set; }


        /// <summary>
        /// OpenId
        /// </summary>
        public string OpenId { get; set; }


        /// <summary>
        /// SourceId
        /// </summary>
        public string SourceId { get; set; }


        /// <summary>
        /// SourceType
        /// </summary>
        public SceneType? SourceType { get; set; }


        /// <summary>
        /// Ticket
        /// </summary>
        public string Ticket { get; set; }


        /// <summary>
        /// TenantId
        /// </summary>
        public int? TenantId { get; set; }





        ////BCC/ BEGIN CUSTOM CODE SECTION

        ////ECC/ END CUSTOM CODE SECTION
    }
}