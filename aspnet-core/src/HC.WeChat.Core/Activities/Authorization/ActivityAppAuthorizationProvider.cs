using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.Activities;

namespace HC.WeChat.Activities.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="ActivityAppPermissions"/> for all permission names.
    /// </summary>
    public class ActivityAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了Activity 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var activity = administration.CreateChildPermission(ActivityAppPermissions.Activity, L("Activity"));
            activity.CreateChildPermission(ActivityAppPermissions.Activity_CreateActivity, L("CreateActivity"));
            activity.CreateChildPermission(ActivityAppPermissions.Activity_EditActivity, L("EditActivity"));
            activity.CreateChildPermission(ActivityAppPermissions.Activity_DeleteActivity, L("DeleteActivity"));
            activity.CreateChildPermission(ActivityAppPermissions.Activity_BatchDeleteActivities, L("BatchDeleteActivities"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}