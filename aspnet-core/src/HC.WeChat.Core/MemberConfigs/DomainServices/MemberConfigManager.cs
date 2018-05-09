using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.MemberConfigs;

namespace HC.WeChat.MemberConfigs.DomainServices
{
    /// <summary>
    /// MemberConfig领域层的业务管理
    /// </summary>
    public class MemberConfigManager : WeChatDomainServiceBase, IMemberConfigManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<MemberConfig, Guid> _memberconfigRepository;
        /// <summary>
        /// MemberConfig的构造方法
        /// </summary>
        public MemberConfigManager(IRepository<MemberConfig, Guid> memberconfigRepository)
        {
            _memberconfigRepository = memberconfigRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitMemberConfig()
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// 通过租户id获取积分配置
        /// </summary>
        /// <returns></returns>
        //public async Task<WechatAppConfigListDto> GetTenantMemberConfigAsync()
        //{
        //    var entity = _wechatappconfigRepository.GetAll().Where(w => w.TenantId == AbpSession.TenantId).FirstOrDefault();
        //    return await Task.FromResult(entity.MapTo<WechatAppConfigListDto>());
        //}

    }

}
