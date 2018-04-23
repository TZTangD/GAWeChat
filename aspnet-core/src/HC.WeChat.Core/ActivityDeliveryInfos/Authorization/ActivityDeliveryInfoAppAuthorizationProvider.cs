using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.ActivityDeliveryInfos;

namespace HC.WeChat.ActivityDeliveryInfos.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="ActivityDeliveryInfoAppPermissions"/> for all permission names.
    /// </summary>
    public class ActivityDeliveryInfoAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了ActivityDeliveryInfo 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var activitydeliveryinfo = administration.CreateChildPermission(ActivityDeliveryInfoAppPermissions.ActivityDeliveryInfo, L("ActivityDeliveryInfo"));
            activitydeliveryinfo.CreateChildPermission(ActivityDeliveryInfoAppPermissions.ActivityDeliveryInfo_CreateActivityDeliveryInfo, L("CreateActivityDeliveryInfo"));
            activitydeliveryinfo.CreateChildPermission(ActivityDeliveryInfoAppPermissions.ActivityDeliveryInfo_EditActivityDeliveryInfo, L("EditActivityDeliveryInfo"));
            activitydeliveryinfo.CreateChildPermission(ActivityDeliveryInfoAppPermissions.ActivityDeliveryInfo_DeleteActivityDeliveryInfo, L("DeleteActivityDeliveryInfo"));
            activitydeliveryinfo.CreateChildPermission(ActivityDeliveryInfoAppPermissions.ActivityDeliveryInfo_BatchDeleteActivityDeliveryInfos, L("BatchDeleteActivityDeliveryInfos"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}