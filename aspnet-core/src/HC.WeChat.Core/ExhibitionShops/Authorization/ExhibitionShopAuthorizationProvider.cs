using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;

namespace HC.WeChat.ExhibitionShops.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="ExhibitionShopAppPermissions"/> for all permission names.
    /// </summary>
    public class ExhibitionShopAppAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
                          //在这里配置了ExhibitionShop 的权限。


            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

 
            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration) 
                ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

        var exhibitionshop = administration.CreateChildPermission(ExhibitionShopAppPermissions.ExhibitionShop , L("ExhibitionShop"));
            exhibitionshop.CreateChildPermission(ExhibitionShopAppPermissions.ExhibitionShop_CreateExhibitionShop, L("CreateExhibitionShop"));
            exhibitionshop.CreateChildPermission(ExhibitionShopAppPermissions.ExhibitionShop_EditExhibitionShop, L("EditExhibitionShop"));           
            exhibitionshop.CreateChildPermission(ExhibitionShopAppPermissions. ExhibitionShop_DeleteExhibitionShop, L("DeleteExhibitionShop"));
     exhibitionshop.CreateChildPermission(ExhibitionShopAppPermissions. ExhibitionShop_BatchDeleteExhibitionShops , L("BatchDeleteExhibitionShops"));
 


        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }




}