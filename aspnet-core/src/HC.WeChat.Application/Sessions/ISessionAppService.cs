using System.Threading.Tasks;
using Abp.Application.Services;
using HC.WeChat.Sessions.Dto;

namespace HC.WeChat.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
