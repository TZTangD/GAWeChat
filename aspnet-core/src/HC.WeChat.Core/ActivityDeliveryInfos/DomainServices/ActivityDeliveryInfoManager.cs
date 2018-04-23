using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.ActivityDeliveryInfos;

namespace HC.WeChat.ActivityDeliveryInfos.DomainServices
{
    /// <summary>
    /// ActivityDeliveryInfo领域层的业务管理
    /// </summary>
    public class ActivityDeliveryInfoManager : WeChatDomainServiceBase, IActivityDeliveryInfoManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<ActivityDeliveryInfo, Guid> _activitydeliveryinfoRepository;
        /// <summary>
        /// ActivityDeliveryInfo的构造方法
        /// </summary>
        public ActivityDeliveryInfoManager(IRepository<ActivityDeliveryInfo, Guid> activitydeliveryinfoRepository)
        {
            _activitydeliveryinfoRepository = activitydeliveryinfoRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitActivityDeliveryInfo()
        {
            throw new NotImplementedException();
        }

    }

}
