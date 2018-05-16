using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.GACustPoints;

namespace HC.WeChat.GACustPoints.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="GACustPointAppPermissions"/> for all permission names.
    /// </summary>
    public class GACustPointAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了GACustPoint 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var gacustpoint = administration.CreateChildPermission(GACustPointAppPermissions.GACustPoint, L("GACustPoint"));
            gacustpoint.CreateChildPermission(GACustPointAppPermissions.GACustPoint_CreateGACustPoint, L("CreateGACustPoint"));
            gacustpoint.CreateChildPermission(GACustPointAppPermissions.GACustPoint_EditGACustPoint, L("EditGACustPoint"));
            gacustpoint.CreateChildPermission(GACustPointAppPermissions.GACustPoint_DeleteGACustPoint, L("DeleteGACustPoint"));
            gacustpoint.CreateChildPermission(GACustPointAppPermissions.GACustPoint_BatchDeleteGACustPoints, L("BatchDeleteGACustPoints"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}