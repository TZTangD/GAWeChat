using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.UserAddresss;

namespace HC.WeChat.UserAddresses.DomainServices
{
    /// <summary>
    /// UserAddress领域层的业务管理
    /// </summary>
    public class UserAddressManager : WeChatDomainServiceBase, IUserAddressManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<UserAddress, Guid> _useraddressRepository;
        /// <summary>
        /// UserAddress的构造方法
        /// </summary>
        public UserAddressManager(IRepository<UserAddress, Guid> useraddressRepository)
        {
            _useraddressRepository = useraddressRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitUserAddress()
        {
            throw new NotImplementedException();
        }

    }

}
