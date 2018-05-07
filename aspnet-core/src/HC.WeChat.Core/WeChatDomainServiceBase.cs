using Abp.Domain.Services;
using HC.WeChat.WechatAppConfigs;

namespace HC.WeChat
{
    public abstract class WeChatDomainServiceBase : DomainService
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        /* Add your common members for all your domain services. */
        /*在领域服务中添加你的自定义公共方法*/
        protected WeChatDomainServiceBase()
        {
            LocalizationSourceName = WeChatConsts.LocalizationSourceName;
        }
    }
}
