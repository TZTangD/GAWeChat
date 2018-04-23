using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.WechatMessages;

namespace HC.WeChat.WechatMessages.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="WechatMessageAppPermissions"/> for all permission names.
    /// </summary>
    public class WechatMessageAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了WechatMessage 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var wechatmessage = administration.CreateChildPermission(WechatMessageAppPermissions.WechatMessage, L("WechatMessage"));
            wechatmessage.CreateChildPermission(WechatMessageAppPermissions.WechatMessage_CreateWechatMessage, L("CreateWechatMessage"));
            wechatmessage.CreateChildPermission(WechatMessageAppPermissions.WechatMessage_EditWechatMessage, L("EditWechatMessage"));
            wechatmessage.CreateChildPermission(WechatMessageAppPermissions.WechatMessage_DeleteWechatMessage, L("DeleteWechatMessage"));
            wechatmessage.CreateChildPermission(WechatMessageAppPermissions.WechatMessage_BatchDeleteWechatMessages, L("BatchDeleteWechatMessages"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}