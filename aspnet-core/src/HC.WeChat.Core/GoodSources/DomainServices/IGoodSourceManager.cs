using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.GoodSources;

namespace HC.WeChat.GoodSources.DomainServices
{
    public interface IGoodSourceManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitGoodSource();

    }
}
