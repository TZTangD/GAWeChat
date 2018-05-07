using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HC.WeChat.MultiTenancy.Dto;

namespace HC.WeChat.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}
