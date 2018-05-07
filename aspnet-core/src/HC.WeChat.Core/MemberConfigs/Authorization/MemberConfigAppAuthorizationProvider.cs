using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.MemberConfigs;

namespace HC.WeChat.MemberConfigs.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="MemberConfigAppPermissions"/> for all permission names.
    /// </summary>
    public class MemberConfigAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了MemberConfig 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var memberconfig = administration.CreateChildPermission(MemberConfigAppPermissions.MemberConfig, L("MemberConfig"));
            memberconfig.CreateChildPermission(MemberConfigAppPermissions.MemberConfig_CreateMemberConfig, L("CreateMemberConfig"));
            memberconfig.CreateChildPermission(MemberConfigAppPermissions.MemberConfig_EditMemberConfig, L("EditMemberConfig"));
            memberconfig.CreateChildPermission(MemberConfigAppPermissions.MemberConfig_DeleteMemberConfig, L("DeleteMemberConfig"));
            memberconfig.CreateChildPermission(MemberConfigAppPermissions.MemberConfig_BatchDeleteMemberConfigs, L("BatchDeleteMemberConfigs"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}