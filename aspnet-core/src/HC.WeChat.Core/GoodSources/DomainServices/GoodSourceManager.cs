using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.GoodSources;

namespace HC.WeChat.GoodSources.DomainServices
{
    /// <summary>
    /// GoodSource领域层的业务管理
    /// </summary>
    public class GoodSourceManager : WeChatDomainServiceBase, IGoodSourceManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<GoodSource, Guid> _goodsourceRepository;
        /// <summary>
        /// GoodSource的构造方法
        /// </summary>
        public GoodSourceManager(IRepository<GoodSource, Guid> goodsourceRepository)
        {
            _goodsourceRepository = goodsourceRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitGoodSource()
        {
            throw new NotImplementedException();
        }

    }

}
