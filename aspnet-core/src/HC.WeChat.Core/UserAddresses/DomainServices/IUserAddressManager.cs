using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.UserAddresss;

namespace HC.WeChat.UserAddresses.DomainServices
{
    public interface IUserAddressManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitUserAddress();

    }
}
