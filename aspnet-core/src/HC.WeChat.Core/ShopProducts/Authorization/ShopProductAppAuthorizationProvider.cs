using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.ShopProducts;

namespace HC.WeChat.ShopProducts.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="ShopProductAppPermissions"/> for all permission names.
    /// </summary>
    public class ShopProductAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了ShopProduct 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var shopproduct = administration.CreateChildPermission(ShopProductAppPermissions.ShopProduct, L("ShopProduct"));
            shopproduct.CreateChildPermission(ShopProductAppPermissions.ShopProduct_CreateShopProduct, L("CreateShopProduct"));
            shopproduct.CreateChildPermission(ShopProductAppPermissions.ShopProduct_EditShopProduct, L("EditShopProduct"));
            shopproduct.CreateChildPermission(ShopProductAppPermissions.ShopProduct_DeleteShopProduct, L("DeleteShopProduct"));
            shopproduct.CreateChildPermission(ShopProductAppPermissions.ShopProduct_BatchDeleteShopProducts, L("BatchDeleteShopProducts"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}