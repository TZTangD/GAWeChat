using System.Threading.Tasks;
using HC.WeChat.Configuration.Dto;

namespace HC.WeChat.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
