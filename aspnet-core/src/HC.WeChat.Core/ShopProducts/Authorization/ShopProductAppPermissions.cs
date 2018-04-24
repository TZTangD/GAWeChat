using HC.WeChat.ShopProducts;

namespace HC.WeChat.ShopProducts.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="ShopProductAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class ShopProductAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// ShopProduct管理权限_自带查询授权
        /// </summary>
        public const string ShopProduct = "Pages.ShopProduct";

        /// <summary>
        /// ShopProduct创建权限
        /// </summary>
        public const string ShopProduct_CreateShopProduct = "Pages.ShopProduct.CreateShopProduct";
        /// <summary>
        /// ShopProduct修改权限
        /// </summary>
        public const string ShopProduct_EditShopProduct = "Pages.ShopProduct.EditShopProduct";
        /// <summary>
        /// ShopProduct删除权限
        /// </summary>
        public const string ShopProduct_DeleteShopProduct = "Pages.ShopProduct.DeleteShopProduct";

        /// <summary>
        /// ShopProduct批量删除权限
        /// </summary>
        public const string ShopProduct_BatchDeleteShopProducts = "Pages.ShopProduct.BatchDeleteShopProducts";

    }

}

