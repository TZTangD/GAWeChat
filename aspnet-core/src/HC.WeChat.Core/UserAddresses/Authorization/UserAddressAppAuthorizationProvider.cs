using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.UserAddresss;

namespace HC.WeChat.UserAddresses.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="UserAddressAppPermissions"/> for all permission names.
    /// </summary>
    public class UserAddressAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了UserAddress 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var useraddress = administration.CreateChildPermission(UserAddressAppPermissions.UserAddress, L("UserAddress"));
            useraddress.CreateChildPermission(UserAddressAppPermissions.UserAddress_CreateUserAddress, L("CreateUserAddress"));
            useraddress.CreateChildPermission(UserAddressAppPermissions.UserAddress_EditUserAddress, L("EditUserAddress"));
            useraddress.CreateChildPermission(UserAddressAppPermissions.UserAddress_DeleteUserAddress, L("DeleteUserAddress"));
            useraddress.CreateChildPermission(UserAddressAppPermissions.UserAddress_BatchDeleteUserAddresses, L("BatchDeleteUserAddresses"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}