using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.WeChatUsers;

namespace HC.WeChat.WeChatUsers.Dtos
{
    public class CreateOrUpdateWeChatUserInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public WeChatUserEditDto WeChatUser { get; set; }

}
}