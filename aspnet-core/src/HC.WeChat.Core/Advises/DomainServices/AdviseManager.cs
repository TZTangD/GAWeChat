using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.Advises;

namespace HC.WeChat.Advises.DomainServices
{
    /// <summary>
    /// Advise领域层的业务管理
    /// </summary>
    public class AdviseManager : WeChatDomainServiceBase, IAdviseManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<Advise, Guid> _adviseRepository;
        /// <summary>
        /// Advise的构造方法
        /// </summary>
        public AdviseManager(IRepository<Advise, Guid> adviseRepository)
        {
            _adviseRepository = adviseRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitAdvise()
        {
            throw new NotImplementedException();
        }

    }

}
