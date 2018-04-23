using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.Retailers;

namespace HC.WeChat.Retailers.DomainServices
{
    /// <summary>
    /// Retailer领域层的业务管理
    /// </summary>
    public class RetailerManager : WeChatDomainServiceBase, IRetailerManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<Retailer, Guid> _retailerRepository;
        /// <summary>
        /// Retailer的构造方法
        /// </summary>
        public RetailerManager(IRepository<Retailer, Guid> retailerRepository)
        {
            _retailerRepository = retailerRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitRetailer()
        {
            throw new NotImplementedException();
        }

    }

}
