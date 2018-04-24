using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.Shops;

namespace HC.WeChat.Shops.DomainServices
{
    public interface IShopManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitShop();

    }
}
