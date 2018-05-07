using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.WechatMessages;

namespace HC.WeChat.WechatMessages.Dtos
{
    public class CreateOrUpdateWechatMessageInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public WechatMessageEditDto WechatMessage { get; set; }

}
}