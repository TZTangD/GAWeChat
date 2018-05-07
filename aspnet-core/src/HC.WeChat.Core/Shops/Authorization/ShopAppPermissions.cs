using HC.WeChat.Shops;

namespace HC.WeChat.Shops.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="ShopAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class ShopAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// Shop管理权限_自带查询授权
        /// </summary>
        public const string Shop = "Pages.Shop";

        /// <summary>
        /// Shop创建权限
        /// </summary>
        public const string Shop_CreateShop = "Pages.Shop.CreateShop";
        /// <summary>
        /// Shop修改权限
        /// </summary>
        public const string Shop_EditShop = "Pages.Shop.EditShop";
        /// <summary>
        /// Shop删除权限
        /// </summary>
        public const string Shop_DeleteShop = "Pages.Shop.DeleteShop";

        /// <summary>
        /// Shop批量删除权限
        /// </summary>
        public const string Shop_BatchDeleteShops = "Pages.Shop.BatchDeleteShops";

    }

}

