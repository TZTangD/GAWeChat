using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.EPCoLines;

namespace HC.WeChat.EPCoLines.DomainServices
{
    /// <summary>
    /// EPCoLine领域层的业务管理
    /// </summary>
    public class EPCoLineManager : WeChatDomainServiceBase, IEPCoLineManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<EPCoLine, Guid> _epcolineRepository;
        /// <summary>
        /// EPCoLine的构造方法
        /// </summary>
        public EPCoLineManager(IRepository<EPCoLine, Guid> epcolineRepository)
        {
            _epcolineRepository = epcolineRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitEPCoLine()
        {
            throw new NotImplementedException();
        }

    }

}
