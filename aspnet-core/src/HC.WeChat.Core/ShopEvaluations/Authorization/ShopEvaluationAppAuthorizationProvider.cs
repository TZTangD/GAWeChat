using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.ShopEvaluations;

namespace HC.WeChat.ShopEvaluations.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="ShopEvaluationAppPermissions"/> for all permission names.
    /// </summary>
    public class ShopEvaluationAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了ShopEvaluation 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var shopevaluation = administration.CreateChildPermission(ShopEvaluationAppPermissions.ShopEvaluation, L("ShopEvaluation"));
            shopevaluation.CreateChildPermission(ShopEvaluationAppPermissions.ShopEvaluation_CreateShopEvaluation, L("CreateShopEvaluation"));
            shopevaluation.CreateChildPermission(ShopEvaluationAppPermissions.ShopEvaluation_EditShopEvaluation, L("EditShopEvaluation"));
            shopevaluation.CreateChildPermission(ShopEvaluationAppPermissions.ShopEvaluation_DeleteShopEvaluation, L("DeleteShopEvaluation"));
            shopevaluation.CreateChildPermission(ShopEvaluationAppPermissions.ShopEvaluation_BatchDeleteShopEvaluations, L("BatchDeleteShopEvaluations"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}