using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.LevelLogs;

namespace HC.WeChat.LevelLogs.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="LevelLogAppPermissions"/> for all permission names.
    /// </summary>
    public class LevelLogAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了LevelLog 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var levellog = administration.CreateChildPermission(LevelLogAppPermissions.LevelLog, L("LevelLog"));
            levellog.CreateChildPermission(LevelLogAppPermissions.LevelLog_CreateLevelLog, L("CreateLevelLog"));
            levellog.CreateChildPermission(LevelLogAppPermissions.LevelLog_EditLevelLog, L("EditLevelLog"));
            levellog.CreateChildPermission(LevelLogAppPermissions.LevelLog_DeleteLevelLog, L("DeleteLevelLog"));
            levellog.CreateChildPermission(LevelLogAppPermissions.LevelLog_BatchDeleteLevelLogs, L("BatchDeleteLevelLogs"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}