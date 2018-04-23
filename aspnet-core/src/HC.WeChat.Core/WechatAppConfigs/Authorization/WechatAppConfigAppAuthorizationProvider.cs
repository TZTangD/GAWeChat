using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.WechatAppConfigs;

namespace HC.WeChat.WechatAppConfigs.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="WechatAppConfigAppPermissions"/> for all permission names.
    /// </summary>
    public class WechatAppConfigAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了WechatAppConfig 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var wechatappconfig = administration.CreateChildPermission(WechatAppConfigAppPermissions.WechatAppConfig, L("WechatAppConfig"));
            wechatappconfig.CreateChildPermission(WechatAppConfigAppPermissions.WechatAppConfig_CreateWechatAppConfig, L("CreateWechatAppConfig"));
            wechatappconfig.CreateChildPermission(WechatAppConfigAppPermissions.WechatAppConfig_EditWechatAppConfig, L("EditWechatAppConfig"));
            wechatappconfig.CreateChildPermission(WechatAppConfigAppPermissions.WechatAppConfig_DeleteWechatAppConfig, L("DeleteWechatAppConfig"));
            wechatappconfig.CreateChildPermission(WechatAppConfigAppPermissions.WechatAppConfig_BatchDeleteWechatAppConfigs, L("BatchDeleteWechatAppConfigs"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}