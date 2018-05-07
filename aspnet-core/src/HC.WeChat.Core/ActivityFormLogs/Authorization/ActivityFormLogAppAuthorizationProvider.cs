using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.ActivityFormLogs;

namespace HC.WeChat.ActivityFormLogs.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="ActivityFormLogAppPermissions"/> for all permission names.
    /// </summary>
    public class ActivityFormLogAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了ActivityFormLog 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var activityformlog = administration.CreateChildPermission(ActivityFormLogAppPermissions.ActivityFormLog, L("ActivityFormLog"));
            activityformlog.CreateChildPermission(ActivityFormLogAppPermissions.ActivityFormLog_CreateActivityFormLog, L("CreateActivityFormLog"));
            activityformlog.CreateChildPermission(ActivityFormLogAppPermissions.ActivityFormLog_EditActivityFormLog, L("EditActivityFormLog"));
            activityformlog.CreateChildPermission(ActivityFormLogAppPermissions.ActivityFormLog_DeleteActivityFormLog, L("DeleteActivityFormLog"));
            activityformlog.CreateChildPermission(ActivityFormLogAppPermissions.ActivityFormLog_BatchDeleteActivityFormLogs, L("BatchDeleteActivityFormLogs"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}