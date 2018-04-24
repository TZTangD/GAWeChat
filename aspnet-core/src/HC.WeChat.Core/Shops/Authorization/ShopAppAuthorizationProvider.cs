using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.Shops;

namespace HC.WeChat.Shops.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="ShopAppPermissions"/> for all permission names.
    /// </summary>
    public class ShopAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了Shop 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var shop = administration.CreateChildPermission(ShopAppPermissions.Shop, L("Shop"));
            shop.CreateChildPermission(ShopAppPermissions.Shop_CreateShop, L("CreateShop"));
            shop.CreateChildPermission(ShopAppPermissions.Shop_EditShop, L("EditShop"));
            shop.CreateChildPermission(ShopAppPermissions.Shop_DeleteShop, L("DeleteShop"));
            shop.CreateChildPermission(ShopAppPermissions.Shop_BatchDeleteShops, L("BatchDeleteShops"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}