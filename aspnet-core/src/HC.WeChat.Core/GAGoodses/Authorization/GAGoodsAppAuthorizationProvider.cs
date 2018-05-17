using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.GAGoodses;

namespace HC.WeChat.GAGoodses.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="GAGoodsAppPermissions"/> for all permission names.
    /// </summary>
    public class GAGoodsAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了GAGoods 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var gagoods = administration.CreateChildPermission(GAGoodsAppPermissions.GAGoods, L("GAGoods"));
            gagoods.CreateChildPermission(GAGoodsAppPermissions.GAGoods_CreateGAGoods, L("CreateGAGoods"));
            gagoods.CreateChildPermission(GAGoodsAppPermissions.GAGoods_EditGAGoods, L("EditGAGoods"));
            gagoods.CreateChildPermission(GAGoodsAppPermissions.GAGoods_DeleteGAGoods, L("DeleteGAGoods"));
            gagoods.CreateChildPermission(GAGoodsAppPermissions.GAGoods_BatchDeleteGAGoodses, L("BatchDeleteGAGoodses"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}