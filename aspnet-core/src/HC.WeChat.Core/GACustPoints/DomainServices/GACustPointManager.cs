using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.GACustPoints;

namespace HC.WeChat.GACustPoints.DomainServices
{
    /// <summary>
    /// GACustPoint领域层的业务管理
    /// </summary>
    public class GACustPointManager : WeChatDomainServiceBase, IGACustPointManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<GACustPoint, int> _gacustpointRepository;
        /// <summary>
        /// GACustPoint的构造方法
        /// </summary>
        public GACustPointManager(IRepository<GACustPoint, int> gacustpointRepository)
        {
            _gacustpointRepository = gacustpointRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitGACustPoint()
        {
            throw new NotImplementedException();
        }

    }

}
