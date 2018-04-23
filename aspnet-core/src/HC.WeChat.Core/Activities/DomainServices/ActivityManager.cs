using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.Domain.Uow;
using HC.WeChat.Activities;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.Activities.DomainServices
{
    /// <summary>
    /// Activity领域层的业务管理
    /// </summary>
    public class ActivityManager : WeChatDomainServiceBase, IActivityManager
    {
        private readonly IRepository<Activity, Guid> _activityRepository;
        private readonly IUnitOfWorkManager _unitOfWorkManager;

        /// <summary>
        /// Activity的构造方法
        /// </summary>
        public ActivityManager(IRepository<Activity, Guid> activityRepository, IUnitOfWorkManager unitOfWorkManager)
        {
            _activityRepository = activityRepository;
            _unitOfWorkManager = unitOfWorkManager;
        }

        public async Task<Activity> GetTenantWeChatActivityAsync(int? tenantId)
        {
            using (_unitOfWorkManager.Current.SetTenantId(tenantId))
            {
                return await Task.FromResult(_activityRepository.GetAll()
                    .Where(w => w.TenantId == tenantId && w.Status == ActivityStatusEnum.已发布)
                    .OrderByDescending(w => w.CreationTime).FirstOrDefault());
            }
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitActivity()
        {
            //throw new NotImplementedException();
        }

    }

}
