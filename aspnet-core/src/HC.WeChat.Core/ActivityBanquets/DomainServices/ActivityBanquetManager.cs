using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.ActivityBanquets;

namespace HC.WeChat.ActivityBanquets.DomainServices
{
    /// <summary>
    /// ActivityBanquet领域层的业务管理
    /// </summary>
    public class ActivityBanquetManager : WeChatDomainServiceBase, IActivityBanquetManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<ActivityBanquet, Guid> _activitybanquetRepository;
        /// <summary>
        /// ActivityBanquet的构造方法
        /// </summary>
        public ActivityBanquetManager(IRepository<ActivityBanquet, Guid> activitybanquetRepository)
        {
            _activitybanquetRepository = activitybanquetRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitActivityBanquet()
        {
            throw new NotImplementedException();
        }

    }

}
