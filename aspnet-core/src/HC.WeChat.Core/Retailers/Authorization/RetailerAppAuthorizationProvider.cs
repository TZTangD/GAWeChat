using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.Retailers;

namespace HC.WeChat.Retailers.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="RetailerAppPermissions"/> for all permission names.
    /// </summary>
    public class RetailerAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了Retailer 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var retailer = administration.CreateChildPermission(RetailerAppPermissions.Retailer, L("Retailer"));
            retailer.CreateChildPermission(RetailerAppPermissions.Retailer_CreateRetailer, L("CreateRetailer"));
            retailer.CreateChildPermission(RetailerAppPermissions.Retailer_EditRetailer, L("EditRetailer"));
            retailer.CreateChildPermission(RetailerAppPermissions.Retailer_DeleteRetailer, L("DeleteRetailer"));
            retailer.CreateChildPermission(RetailerAppPermissions.Retailer_BatchDeleteRetailers, L("BatchDeleteRetailers"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}