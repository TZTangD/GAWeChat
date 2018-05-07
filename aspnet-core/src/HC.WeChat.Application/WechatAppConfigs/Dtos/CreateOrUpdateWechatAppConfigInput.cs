using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.WechatAppConfigs;

namespace HC.WeChat.WechatAppConfigs.Dtos
{
    public class CreateOrUpdateWechatAppConfigInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public WechatAppConfigEditDto WechatAppConfig { get; set; }

}
}