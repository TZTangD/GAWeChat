using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Auditing;
using Abp.Domain.Repositories;
using HC.WeChat.Sessions.Dto;
using HC.WeChat.Shops;
using HC.WeChat.SignalR;
using HC.WeChat.WechatEnums;
using Microsoft.EntityFrameworkCore;

namespace HC.WeChat.Sessions
{
    public class SessionAppService : WeChatAppServiceBase
    {
        private readonly IRepository<Shop, Guid> _shopRepository;

        public SessionAppService(IRepository<Shop, Guid> shopRepository)
        {
            _shopRepository = shopRepository;
        }

        [DisableAuditing]
        public async Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations()
        {
            var output = new GetCurrentLoginInformationsOutput
            {
                Application = new ApplicationInfoDto
                {
                    Version = AppVersionHelper.Version,
                    ReleaseDate = AppVersionHelper.ReleaseDate,
                    Features = new Dictionary<string, bool>
                    {
                        { "SignalR", SignalRFeature.IsAvailable },
                        { "SignalR.AspNetCore", SignalRFeature.IsAspNetCore }
                    }
                }
            };

            if (AbpSession.TenantId.HasValue)
            {
                output.Tenant = ObjectMapper.Map<TenantLoginInfoDto>(await GetCurrentTenantAsync());
            }

            if (AbpSession.UserId.HasValue)
            {
                var user = await GetCurrentUserAsync();
                output.User = ObjectMapper.Map<UserLoginInfoDto>(user);
                output.User.NotifyCount = await _shopRepository.GetAll().Where(s => s.Status == ShopAuditStatus.待审核).CountAsync();
                output.Roles = await UserManager.GetRolesAsync(user);
                if (!AbpSession.TenantId.HasValue)
                {
                    for (int i = 0; i < output.Roles.Count; i++)
                    {
                        output.Roles[i] = "Host" + output.Roles[i];
                    }
                }
            }

            return output;
        }
    }
}
