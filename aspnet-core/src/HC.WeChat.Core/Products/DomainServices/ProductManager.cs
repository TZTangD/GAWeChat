using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.Products;

namespace HC.WeChat.Products.DomainServices
{
    /// <summary>
    /// Product领域层的业务管理
    /// </summary>
    public class ProductManager : WeChatDomainServiceBase, IProductManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<Product, Guid> _productRepository;
        /// <summary>
        /// Product的构造方法
        /// </summary>
        public ProductManager(IRepository<Product, Guid> productRepository)
        {
            _productRepository = productRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitProduct()
        {
            throw new NotImplementedException();
        }

    }

}
