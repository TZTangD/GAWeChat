using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.MemberConfigs;

namespace HC.WeChat.MemberConfigs.DomainServices
{
    public interface IMemberConfigManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitMemberConfig();
        //GetTenantMemberConfigAsync
    }
}
