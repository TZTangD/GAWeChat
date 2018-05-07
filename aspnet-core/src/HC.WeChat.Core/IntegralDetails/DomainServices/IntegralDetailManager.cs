using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.IntegralDetails;

namespace HC.WeChat.IntegralDetails.DomainServices
{
    /// <summary>
    /// IntegralDetail领域层的业务管理
    /// </summary>
    public class IntegralDetailManager : WeChatDomainServiceBase, IIntegralDetailManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<IntegralDetail, Guid> _integraldetailRepository;
        /// <summary>
        /// IntegralDetail的构造方法
        /// </summary>
        public IntegralDetailManager(IRepository<IntegralDetail, Guid> integraldetailRepository)
        {
            _integraldetailRepository = integraldetailRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitIntegralDetail()
        {
            throw new NotImplementedException();
        }

    }

}
