using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.WechatMessages;

namespace HC.WeChat.WechatMessages.DomainServices
{
    /// <summary>
    /// WechatMessage领域层的业务管理
    /// </summary>
    public class WechatMessageManager : WeChatDomainServiceBase, IWechatMessageManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<WechatMessage, Guid> _wechatmessageRepository;
        /// <summary>
        /// WechatMessage的构造方法
        /// </summary>
        public WechatMessageManager(IRepository<WechatMessage, Guid> wechatmessageRepository)
        {
            _wechatmessageRepository = wechatmessageRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitWechatMessage()
        {
            throw new NotImplementedException();
        }

    }

}
