using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.EPCos;

namespace HC.WeChat.EPCos.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="EPCoAppPermissions"/> for all permission names.
    /// </summary>
    public class EPCoAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了EPCo 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var epco = administration.CreateChildPermission(EPCoAppPermissions.EPCo, L("EPCo"));
            epco.CreateChildPermission(EPCoAppPermissions.EPCo_CreateEPCo, L("CreateEPCo"));
            epco.CreateChildPermission(EPCoAppPermissions.EPCo_EditEPCo, L("EditEPCo"));
            epco.CreateChildPermission(EPCoAppPermissions.EPCo_DeleteEPCo, L("DeleteEPCo"));
            epco.CreateChildPermission(EPCoAppPermissions.EPCo_BatchDeleteEPCos, L("BatchDeleteEPCos"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}