using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.Products;

namespace HC.WeChat.Products.DomainServices
{
    public interface IProductManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitProduct();

    }
}
