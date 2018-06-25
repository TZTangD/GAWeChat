using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.LuckyDraws;

namespace HC.WeChat.LuckyDraws.DomainServices
{
    /// <summary>
    /// LuckyDraw领域层的业务管理
    /// </summary>
    public class LuckyDrawManager : WeChatDomainServiceBase, ILuckyDrawManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<LuckyDraw, Guid> _luckydrawRepository;
        /// <summary>
        /// LuckyDraw的构造方法
        /// </summary>
        public LuckyDrawManager(IRepository<LuckyDraw, Guid> luckydrawRepository)
        {
            _luckydrawRepository = luckydrawRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitLuckyDraw()
        {
            throw new NotImplementedException();
        }

    }

}
