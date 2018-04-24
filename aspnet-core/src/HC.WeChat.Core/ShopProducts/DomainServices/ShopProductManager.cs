using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.ShopProducts;

namespace HC.WeChat.ShopProducts.DomainServices
{
    /// <summary>
    /// ShopProduct领域层的业务管理
    /// </summary>
    public class ShopProductManager : WeChatDomainServiceBase, IShopProductManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<ShopProduct, Guid> _shopproductRepository;
        /// <summary>
        /// ShopProduct的构造方法
        /// </summary>
        public ShopProductManager(IRepository<ShopProduct, Guid> shopproductRepository)
        {
            _shopproductRepository = shopproductRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitShopProduct()
        {
            throw new NotImplementedException();
        }

    }

}
