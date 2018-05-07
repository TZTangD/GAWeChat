using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.ShopEvaluations;

namespace HC.WeChat.ShopEvaluations.DomainServices
{
    /// <summary>
    /// ShopEvaluation领域层的业务管理
    /// </summary>
    public class ShopEvaluationManager : WeChatDomainServiceBase, IShopEvaluationManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<ShopEvaluation, Guid> _shopevaluationRepository;
        /// <summary>
        /// ShopEvaluation的构造方法
        /// </summary>
        public ShopEvaluationManager(IRepository<ShopEvaluation, Guid> shopevaluationRepository)
        {
            _shopevaluationRepository = shopevaluationRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitShopEvaluation()
        {
            throw new NotImplementedException();
        }

    }

}
