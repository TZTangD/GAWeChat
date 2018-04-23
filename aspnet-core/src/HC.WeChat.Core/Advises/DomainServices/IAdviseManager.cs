using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.Advises;

namespace HC.WeChat.Advises.DomainServices
{
    public interface IAdviseManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitAdvise();

    }
}
