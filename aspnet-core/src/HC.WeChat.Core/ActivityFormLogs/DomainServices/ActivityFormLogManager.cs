using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.ActivityFormLogs;

namespace HC.WeChat.ActivityFormLogs.DomainServices
{
    /// <summary>
    /// ActivityFormLog领域层的业务管理
    /// </summary>
    public class ActivityFormLogManager : WeChatDomainServiceBase, IActivityFormLogManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<ActivityFormLog, Guid> _activityformlogRepository;
        /// <summary>
        /// ActivityFormLog的构造方法
        /// </summary>
        public ActivityFormLogManager(IRepository<ActivityFormLog, Guid> activityformlogRepository)
        {
            _activityformlogRepository = activityformlogRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitActivityFormLog()
        {
            throw new NotImplementedException();
        }

    }

}
