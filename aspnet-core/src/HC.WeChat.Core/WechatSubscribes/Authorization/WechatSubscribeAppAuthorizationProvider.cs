using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.WechatSubscribes;

namespace HC.WeChat.WechatSubscribes.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="WechatSubscribeAppPermissions"/> for all permission names.
    /// </summary>
    public class WechatSubscribeAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了WechatSubscribe 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var wechatsubscribe = administration.CreateChildPermission(WechatSubscribeAppPermissions.WechatSubscribe, L("WechatSubscribe"));
            wechatsubscribe.CreateChildPermission(WechatSubscribeAppPermissions.WechatSubscribe_CreateWechatSubscribe, L("CreateWechatSubscribe"));
            wechatsubscribe.CreateChildPermission(WechatSubscribeAppPermissions.WechatSubscribe_EditWechatSubscribe, L("EditWechatSubscribe"));
            wechatsubscribe.CreateChildPermission(WechatSubscribeAppPermissions.WechatSubscribe_DeleteWechatSubscribe, L("DeleteWechatSubscribe"));
            wechatsubscribe.CreateChildPermission(WechatSubscribeAppPermissions.WechatSubscribe_BatchDeleteWechatSubscribes, L("BatchDeleteWechatSubscribes"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}