using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.WechatAppConfigs;

namespace HC.WeChat.WechatAppConfigs.DomainServices
{
    /// <summary>
    /// WechatAppConfig领域层的业务管理
    /// </summary>
    public class WechatAppConfigManager : WeChatDomainServiceBase, IWechatAppConfigManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<WechatAppConfig, int> _wechatappconfigRepository;
        /// <summary>
        /// WechatAppConfig的构造方法
        /// </summary>
        public WechatAppConfigManager(IRepository<WechatAppConfig, int> wechatappconfigRepository)
        {
            _wechatappconfigRepository = wechatappconfigRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitWechatAppConfig()
        {
            throw new NotImplementedException();
        }

    }

}
