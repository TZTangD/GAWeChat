using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.WechatSubscribes;

namespace HC.WeChat.WechatSubscribes.Dtos
{
    public class CreateOrUpdateWechatSubscribeInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public WechatSubscribeEditDto WechatSubscribe { get; set; }

}
}