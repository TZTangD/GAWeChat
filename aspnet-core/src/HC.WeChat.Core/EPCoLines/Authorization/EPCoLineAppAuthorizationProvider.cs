using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.EPCoLines;

namespace HC.WeChat.EPCoLines.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="EPCoLineAppPermissions"/> for all permission names.
    /// </summary>
    public class EPCoLineAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了EPCoLine 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var epcoline = administration.CreateChildPermission(EPCoLineAppPermissions.EPCoLine, L("EPCoLine"));
            epcoline.CreateChildPermission(EPCoLineAppPermissions.EPCoLine_CreateEPCoLine, L("CreateEPCoLine"));
            epcoline.CreateChildPermission(EPCoLineAppPermissions.EPCoLine_EditEPCoLine, L("EditEPCoLine"));
            epcoline.CreateChildPermission(EPCoLineAppPermissions.EPCoLine_DeleteEPCoLine, L("DeleteEPCoLine"));
            epcoline.CreateChildPermission(EPCoLineAppPermissions.EPCoLine_BatchDeleteEPCoLines, L("BatchDeleteEPCoLines"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}