using System.ComponentModel.DataAnnotations;
using HC.WeChat.QrCodeLogs;
using Abp.Domain.Entities.Auditing;
using System;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.QrCodeLogs.Dtos
{
    public class QrCodeLogEditDto: CreationAuditedEntity<Guid?>
    {
        //public Guid? Id { get; set; }

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