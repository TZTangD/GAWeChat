using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.ActivityGoodses;

namespace HC.WeChat.ActivityGoodses.DomainServices
{
    /// <summary>
    /// ActivityGoods领域层的业务管理
    /// </summary>
    public class ActivityGoodsManager : WeChatDomainServiceBase, IActivityGoodsManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<ActivityGoods, Guid> _activitygoodsRepository;
        /// <summary>
        /// ActivityGoods的构造方法
        /// </summary>
        public ActivityGoodsManager(IRepository<ActivityGoods, Guid> activitygoodsRepository)
        {
            _activitygoodsRepository = activitygoodsRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitActivityGoods()
        {
            throw new NotImplementedException();
        }

    }

}
