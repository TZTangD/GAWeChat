using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.WechatSubscribes;

namespace HC.WeChat.WechatSubscribes.DomainServices
{
    /// <summary>
    /// WechatSubscribe领域层的业务管理
    /// </summary>
    public class WechatSubscribeManager : WeChatDomainServiceBase, IWechatSubscribeManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<WechatSubscribe, Guid> _wechatsubscribeRepository;
        /// <summary>
        /// WechatSubscribe的构造方法
        /// </summary>
        public WechatSubscribeManager(IRepository<WechatSubscribe, Guid> wechatsubscribeRepository)
        {
            _wechatsubscribeRepository = wechatsubscribeRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitWechatSubscribe()
        {
            throw new NotImplementedException();
        }

    }

}
