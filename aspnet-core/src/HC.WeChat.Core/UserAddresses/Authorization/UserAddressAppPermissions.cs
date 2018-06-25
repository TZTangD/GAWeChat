using HC.WeChat.UserAddresss;

namespace HC.WeChat.UserAddresses.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="UserAddressAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class UserAddressAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// UserAddress管理权限_自带查询授权
        /// </summary>
        public const string UserAddress = "Pages.UserAddress";

        /// <summary>
        /// UserAddress创建权限
        /// </summary>
        public const string UserAddress_CreateUserAddress = "Pages.UserAddress.CreateUserAddress";
        /// <summary>
        /// UserAddress修改权限
        /// </summary>
        public const string UserAddress_EditUserAddress = "Pages.UserAddress.EditUserAddress";
        /// <summary>
        /// UserAddress删除权限
        /// </summary>
        public const string UserAddress_DeleteUserAddress = "Pages.UserAddress.DeleteUserAddress";

        /// <summary>
        /// UserAddress批量删除权限
        /// </summary>
        public const string UserAddress_BatchDeleteUserAddresses = "Pages.UserAddress.BatchDeleteUserAddresses";

    }

}

