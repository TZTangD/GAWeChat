using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.WeChatGroups;

namespace HC.WeChat.WeChatGroups.DomainServices
{
    public interface IWeChatGroupManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitWeChatGroup();

    }
}
