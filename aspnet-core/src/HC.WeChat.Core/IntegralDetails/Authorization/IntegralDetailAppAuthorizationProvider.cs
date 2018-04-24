using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.IntegralDetails;

namespace HC.WeChat.IntegralDetails.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="IntegralDetailAppPermissions"/> for all permission names.
    /// </summary>
    public class IntegralDetailAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了IntegralDetail 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var integraldetail = administration.CreateChildPermission(IntegralDetailAppPermissions.IntegralDetail, L("IntegralDetail"));
            integraldetail.CreateChildPermission(IntegralDetailAppPermissions.IntegralDetail_CreateIntegralDetail, L("CreateIntegralDetail"));
            integraldetail.CreateChildPermission(IntegralDetailAppPermissions.IntegralDetail_EditIntegralDetail, L("EditIntegralDetail"));
            integraldetail.CreateChildPermission(IntegralDetailAppPermissions.IntegralDetail_DeleteIntegralDetail, L("DeleteIntegralDetail"));
            integraldetail.CreateChildPermission(IntegralDetailAppPermissions.IntegralDetail_BatchDeleteIntegralDetails, L("BatchDeleteIntegralDetails"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}