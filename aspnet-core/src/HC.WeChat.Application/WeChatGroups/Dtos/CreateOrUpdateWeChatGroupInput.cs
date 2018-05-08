using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.WeChatGroups;

namespace HC.WeChat.WeChatGroups.Dtos
{
    public class CreateOrUpdateWeChatGroupInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public WeChatGroupEditDto WeChatGroup { get; set; }

}
}