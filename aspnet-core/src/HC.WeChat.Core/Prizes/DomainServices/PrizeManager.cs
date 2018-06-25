using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.Prizes;

namespace HC.WeChat.Prizes.DomainServices
{
    /// <summary>
    /// Prize领域层的业务管理
    /// </summary>
    public class PrizeManager : WeChatDomainServiceBase, IPrizeManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<Prize, Guid> _prizeRepository;
        /// <summary>
        /// Prize的构造方法
        /// </summary>
        public PrizeManager(IRepository<Prize, Guid> prizeRepository)
        {
            _prizeRepository = prizeRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitPrize()
        {
            throw new NotImplementedException();
        }

    }

}
