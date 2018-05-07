using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using HC.WeChat.Configuration.Dto;

namespace HC.WeChat.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : WeChatAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
