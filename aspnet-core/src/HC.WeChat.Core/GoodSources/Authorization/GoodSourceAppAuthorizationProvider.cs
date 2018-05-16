using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.GoodSources;

namespace HC.WeChat.GoodSources.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="GoodSourceAppPermissions"/> for all permission names.
    /// </summary>
    public class GoodSourceAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了GoodSource 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var goodsource = administration.CreateChildPermission(GoodSourceAppPermissions.GoodSource, L("GoodSource"));
            goodsource.CreateChildPermission(GoodSourceAppPermissions.GoodSource_CreateGoodSource, L("CreateGoodSource"));
            goodsource.CreateChildPermission(GoodSourceAppPermissions.GoodSource_EditGoodSource, L("EditGoodSource"));
            goodsource.CreateChildPermission(GoodSourceAppPermissions.GoodSource_DeleteGoodSource, L("DeleteGoodSource"));
            goodsource.CreateChildPermission(GoodSourceAppPermissions.GoodSource_BatchDeleteGoodSources, L("BatchDeleteGoodSources"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}