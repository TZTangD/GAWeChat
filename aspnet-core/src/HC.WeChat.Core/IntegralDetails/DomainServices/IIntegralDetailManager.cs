using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.IntegralDetails;

namespace HC.WeChat.IntegralDetails.DomainServices
{
    public interface IIntegralDetailManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitIntegralDetail();

    }
}
