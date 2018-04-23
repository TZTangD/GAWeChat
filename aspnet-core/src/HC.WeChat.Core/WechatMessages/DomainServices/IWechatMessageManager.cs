using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.WechatMessages;

namespace HC.WeChat.WechatMessages.DomainServices
{
    public interface IWechatMessageManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitWechatMessage();

    }
}
