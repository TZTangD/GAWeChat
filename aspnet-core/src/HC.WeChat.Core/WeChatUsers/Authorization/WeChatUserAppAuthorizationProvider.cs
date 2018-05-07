using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.WeChatUsers;

namespace HC.WeChat.WeChatUsers.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="WeChatUserAppPermissions"/> for all permission names.
    /// </summary>
    public class WeChatUserAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了WeChatUser 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var wechatuser = administration.CreateChildPermission(WeChatUserAppPermissions.WeChatUser, L("WeChatUser"));
            wechatuser.CreateChildPermission(WeChatUserAppPermissions.WeChatUser_CreateWeChatUser, L("CreateWeChatUser"));
            wechatuser.CreateChildPermission(WeChatUserAppPermissions.WeChatUser_EditWeChatUser, L("EditWeChatUser"));
            wechatuser.CreateChildPermission(WeChatUserAppPermissions.WeChatUser_DeleteWeChatUser, L("DeleteWeChatUser"));
            wechatuser.CreateChildPermission(WeChatUserAppPermissions.WeChatUser_BatchDeleteWeChatUsers, L("BatchDeleteWeChatUsers"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}