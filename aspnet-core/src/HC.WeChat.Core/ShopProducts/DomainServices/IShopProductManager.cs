using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.ShopProducts;

namespace HC.WeChat.ShopProducts.DomainServices
{
    public interface IShopProductManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitShopProduct();

    }
}
