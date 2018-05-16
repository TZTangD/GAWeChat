using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.GAGoodses;

namespace HC.WeChat.GAGoodses.DomainServices
{
    /// <summary>
    /// GAGoods领域层的业务管理
    /// </summary>
    public class GAGoodsManager : WeChatDomainServiceBase, IGAGoodsManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<GAGoods, int> _gagoodsRepository;
        /// <summary>
        /// GAGoods的构造方法
        /// </summary>
        public GAGoodsManager(IRepository<GAGoods, int> gagoodsRepository)
        {
            _gagoodsRepository = gagoodsRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitGAGoods()
        {
            throw new NotImplementedException();
        }

    }

}
