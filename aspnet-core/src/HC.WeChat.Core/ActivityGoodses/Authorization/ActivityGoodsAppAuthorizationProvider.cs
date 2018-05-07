using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.ActivityGoodses;

namespace HC.WeChat.ActivityGoodses.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="ActivityGoodsAppPermissions"/> for all permission names.
    /// </summary>
    public class ActivityGoodsAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了ActivityGoods 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var activitygoods = administration.CreateChildPermission(ActivityGoodsAppPermissions.ActivityGoods, L("ActivityGoods"));
            activitygoods.CreateChildPermission(ActivityGoodsAppPermissions.ActivityGoods_CreateActivityGoods, L("CreateActivityGoods"));
            activitygoods.CreateChildPermission(ActivityGoodsAppPermissions.ActivityGoods_EditActivityGoods, L("EditActivityGoods"));
            activitygoods.CreateChildPermission(ActivityGoodsAppPermissions.ActivityGoods_DeleteActivityGoods, L("DeleteActivityGoods"));
            activitygoods.CreateChildPermission(ActivityGoodsAppPermissions.ActivityGoods_BatchDeleteActivityGoodses, L("BatchDeleteActivityGoodses"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}