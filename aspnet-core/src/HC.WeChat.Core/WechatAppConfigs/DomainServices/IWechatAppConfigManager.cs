using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.WechatAppConfigs;

namespace HC.WeChat.WechatAppConfigs.DomainServices
{
    public interface IWechatAppConfigManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitWechatAppConfig();

    }
}
