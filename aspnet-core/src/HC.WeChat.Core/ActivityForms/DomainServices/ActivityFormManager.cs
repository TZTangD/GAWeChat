using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.ActivityForms;

namespace HC.WeChat.ActivityForms.DomainServices
{
    /// <summary>
    /// ActivityForm领域层的业务管理
    /// </summary>
    public class ActivityFormManager : WeChatDomainServiceBase, IActivityFormManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<ActivityForm, Guid> _activityformRepository;
        /// <summary>
        /// ActivityForm的构造方法
        /// </summary>
        public ActivityFormManager(IRepository<ActivityForm, Guid> activityformRepository)
        {
            _activityformRepository = activityformRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitActivityForm()
        {
            throw new NotImplementedException();
        }

    }

}
