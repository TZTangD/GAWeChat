using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.EPCos;

namespace HC.WeChat.EPCos.DomainServices
{
    public interface IEPCoManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitEPCo();

    }
}
