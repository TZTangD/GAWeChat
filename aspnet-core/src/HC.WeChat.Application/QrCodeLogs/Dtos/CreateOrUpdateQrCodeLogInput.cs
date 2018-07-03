using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.QrCodeLogs;

namespace HC.WeChat.QrCodeLogs.Dtos
{
    public class CreateOrUpdateQrCodeLogInput
    {
        [Required]
        public QrCodeLogEditDto QrCodeLog { get; set; }
     
    }
}