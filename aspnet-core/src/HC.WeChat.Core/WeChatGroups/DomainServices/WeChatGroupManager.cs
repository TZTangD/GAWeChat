using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.WeChatGroups;

namespace HC.WeChat.WeChatGroups.DomainServices
{
    /// <summary>
    /// WeChatGroup领域层的业务管理
    /// </summary>
    public class WeChatGroupManager : WeChatDomainServiceBase, IWeChatGroupManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<WeChatGroup, int> _wechatgroupRepository;
        /// <summary>
        /// WeChatGroup的构造方法
        /// </summary>
        public WeChatGroupManager(IRepository<WeChatGroup, int> wechatgroupRepository)
        {
            _wechatgroupRepository = wechatgroupRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitWeChatGroup()
        {
            throw new NotImplementedException();
        }

    }

}
