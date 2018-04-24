using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.StatisticalDetails;

namespace HC.WeChat.StatisticalDetails.DomainServices
{
    /// <summary>
    /// StatisticalDetail领域层的业务管理
    /// </summary>
    public class StatisticalDetailManager : WeChatDomainServiceBase, IStatisticalDetailManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<StatisticalDetail, Guid> _statisticaldetailRepository;
        /// <summary>
        /// StatisticalDetail的构造方法
        /// </summary>
        public StatisticalDetailManager(IRepository<StatisticalDetail, Guid> statisticaldetailRepository)
        {
            _statisticaldetailRepository = statisticaldetailRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitStatisticalDetail()
        {
            throw new NotImplementedException();
        }

    }

}
