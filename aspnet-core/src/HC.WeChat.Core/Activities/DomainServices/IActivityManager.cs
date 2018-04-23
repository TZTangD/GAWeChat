using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.Activities;

namespace HC.WeChat.Activities.DomainServices
{
    public interface IActivityManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitActivity();

        Task<Activity> GetTenantWeChatActivityAsync(int? tenantId);

    }
}
