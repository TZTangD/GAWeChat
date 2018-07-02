using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.ExhibitionShops;


namespace HC.WeChat.ExhibitionShops.DomainServices
{
    public interface IExhibitionShopManager : IDomainService
    {
        
        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitExhibitionShop();



    }
}
