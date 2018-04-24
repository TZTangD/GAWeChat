using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.StatisticalDetails;

namespace HC.WeChat.StatisticalDetails.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="StatisticalDetailAppPermissions"/> for all permission names.
    /// </summary>
    public class StatisticalDetailAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了StatisticalDetail 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var statisticaldetail = administration.CreateChildPermission(StatisticalDetailAppPermissions.StatisticalDetail, L("StatisticalDetail"));
            statisticaldetail.CreateChildPermission(StatisticalDetailAppPermissions.StatisticalDetail_CreateStatisticalDetail, L("CreateStatisticalDetail"));
            statisticaldetail.CreateChildPermission(StatisticalDetailAppPermissions.StatisticalDetail_EditStatisticalDetail, L("EditStatisticalDetail"));
            statisticaldetail.CreateChildPermission(StatisticalDetailAppPermissions.StatisticalDetail_DeleteStatisticalDetail, L("DeleteStatisticalDetail"));
            statisticaldetail.CreateChildPermission(StatisticalDetailAppPermissions.StatisticalDetail_BatchDeleteStatisticalDetails, L("BatchDeleteStatisticalDetails"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}