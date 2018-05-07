using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.Advises;

namespace HC.WeChat.Advises.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="AdviseAppPermissions"/> for all permission names.
    /// </summary>
    public class AdviseAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了Advise 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var advise = administration.CreateChildPermission(AdviseAppPermissions.Advise, L("Advise"));
            advise.CreateChildPermission(AdviseAppPermissions.Advise_CreateAdvise, L("CreateAdvise"));
            advise.CreateChildPermission(AdviseAppPermissions.Advise_EditAdvise, L("EditAdvise"));
            advise.CreateChildPermission(AdviseAppPermissions.Advise_DeleteAdvise, L("DeleteAdvise"));
            advise.CreateChildPermission(AdviseAppPermissions.Advise_BatchDeleteAdvises, L("BatchDeleteAdvises"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}