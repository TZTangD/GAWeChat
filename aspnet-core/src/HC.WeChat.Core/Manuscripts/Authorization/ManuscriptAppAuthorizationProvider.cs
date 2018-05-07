using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.Manuscripts;

namespace HC.WeChat.Manuscripts.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="ManuscriptAppPermissions"/> for all permission names.
    /// </summary>
    public class ManuscriptAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了Manuscript 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var manuscript = administration.CreateChildPermission(ManuscriptAppPermissions.Manuscript, L("Manuscript"));
            manuscript.CreateChildPermission(ManuscriptAppPermissions.Manuscript_CreateManuscript, L("CreateManuscript"));
            manuscript.CreateChildPermission(ManuscriptAppPermissions.Manuscript_EditManuscript, L("EditManuscript"));
            manuscript.CreateChildPermission(ManuscriptAppPermissions.Manuscript_DeleteManuscript, L("DeleteManuscript"));
            manuscript.CreateChildPermission(ManuscriptAppPermissions.Manuscript_BatchDeleteManuscripts, L("BatchDeleteManuscripts"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}