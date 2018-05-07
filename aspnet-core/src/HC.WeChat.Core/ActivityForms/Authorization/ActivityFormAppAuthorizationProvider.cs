using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.ActivityForms;

namespace HC.WeChat.ActivityForms.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="ActivityFormAppPermissions"/> for all permission names.
    /// </summary>
    public class ActivityFormAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了ActivityForm 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var activityform = administration.CreateChildPermission(ActivityFormAppPermissions.ActivityForm, L("ActivityForm"));
            activityform.CreateChildPermission(ActivityFormAppPermissions.ActivityForm_CreateActivityForm, L("CreateActivityForm"));
            activityform.CreateChildPermission(ActivityFormAppPermissions.ActivityForm_EditActivityForm, L("EditActivityForm"));
            activityform.CreateChildPermission(ActivityFormAppPermissions.ActivityForm_DeleteActivityForm, L("DeleteActivityForm"));
            activityform.CreateChildPermission(ActivityFormAppPermissions.ActivityForm_BatchDeleteActivityForms, L("BatchDeleteActivityForms"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}