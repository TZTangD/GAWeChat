using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.EPCos;

namespace HC.WeChat.EPCos.DomainServices
{
    /// <summary>
    /// EPCo领域层的业务管理
    /// </summary>
    public class EPCoManager : WeChatDomainServiceBase, IEPCoManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<EPCo, Guid> _epcoRepository;
        /// <summary>
        /// EPCo的构造方法
        /// </summary>
        public EPCoManager(IRepository<EPCo, Guid> epcoRepository)
        {
            _epcoRepository = epcoRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitEPCo()
        {
            throw new NotImplementedException();
        }

    }

}
