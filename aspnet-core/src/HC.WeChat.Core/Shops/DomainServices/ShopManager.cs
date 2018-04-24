using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.Shops;

namespace HC.WeChat.Shops.DomainServices
{
    /// <summary>
    /// Shop领域层的业务管理
    /// </summary>
    public class ShopManager : WeChatDomainServiceBase, IShopManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<Shop, Guid> _shopRepository;
        /// <summary>
        /// Shop的构造方法
        /// </summary>
        public ShopManager(IRepository<Shop, Guid> shopRepository)
        {
            _shopRepository = shopRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitShop()
        {
            throw new NotImplementedException();
        }

    }

}
