using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.Retailers;

namespace HC.WeChat.Retailers.DomainServices
{
    public interface IRetailerManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitRetailer();

    }
}
