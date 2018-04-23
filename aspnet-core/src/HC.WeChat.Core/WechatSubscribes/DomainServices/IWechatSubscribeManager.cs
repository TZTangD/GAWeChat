using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.WechatSubscribes;

namespace HC.WeChat.WechatSubscribes.DomainServices
{
    public interface IWechatSubscribeManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitWechatSubscribe();

    }
}
