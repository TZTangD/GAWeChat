using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.WeChatGroups;

namespace HC.WeChat.WeChatGroups.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="WeChatGroupAppPermissions"/> for all permission names.
    /// </summary>
    public class WeChatGroupAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了WeChatGroup 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var wechatgroup = administration.CreateChildPermission(WeChatGroupAppPermissions.WeChatGroup, L("WeChatGroup"));
            wechatgroup.CreateChildPermission(WeChatGroupAppPermissions.WeChatGroup_CreateWeChatGroup, L("CreateWeChatGroup"));
            wechatgroup.CreateChildPermission(WeChatGroupAppPermissions.WeChatGroup_EditWeChatGroup, L("EditWeChatGroup"));
            wechatgroup.CreateChildPermission(WeChatGroupAppPermissions.WeChatGroup_DeleteWeChatGroup, L("DeleteWeChatGroup"));
            wechatgroup.CreateChildPermission(WeChatGroupAppPermissions.WeChatGroup_BatchDeleteWeChatGroups, L("BatchDeleteWeChatGroups"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}