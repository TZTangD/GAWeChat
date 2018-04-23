using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.ActivityBanquets;

namespace HC.WeChat.ActivityBanquets.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="ActivityBanquetAppPermissions"/> for all permission names.
    /// </summary>
    public class ActivityBanquetAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了ActivityBanquet 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var activitybanquet = administration.CreateChildPermission(ActivityBanquetAppPermissions.ActivityBanquet, L("ActivityBanquet"));
            activitybanquet.CreateChildPermission(ActivityBanquetAppPermissions.ActivityBanquet_CreateActivityBanquet, L("CreateActivityBanquet"));
            activitybanquet.CreateChildPermission(ActivityBanquetAppPermissions.ActivityBanquet_EditActivityBanquet, L("EditActivityBanquet"));
            activitybanquet.CreateChildPermission(ActivityBanquetAppPermissions.ActivityBanquet_DeleteActivityBanquet, L("DeleteActivityBanquet"));
            activitybanquet.CreateChildPermission(ActivityBanquetAppPermissions.ActivityBanquet_BatchDeleteActivityBanquets, L("BatchDeleteActivityBanquets"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}