using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.Manuscripts;

namespace HC.WeChat.Manuscripts.DomainServices
{
    /// <summary>
    /// Manuscript领域层的业务管理
    /// </summary>
    public class ManuscriptManager : WeChatDomainServiceBase, IManuscriptManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<Manuscript, Guid> _manuscriptRepository;
        /// <summary>
        /// Manuscript的构造方法
        /// </summary>
        public ManuscriptManager(IRepository<Manuscript, Guid> manuscriptRepository)
        {
            _manuscriptRepository = manuscriptRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitManuscript()
        {
            throw new NotImplementedException();
        }

    }

}
