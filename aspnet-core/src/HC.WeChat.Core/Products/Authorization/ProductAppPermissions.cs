using HC.WeChat.Products;

namespace HC.WeChat.Products.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="ProductAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class ProductAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// Product管理权限_自带查询授权
        /// </summary>
        public const string Product = "Pages.Product";

        /// <summary>
        /// Product创建权限
        /// </summary>
        public const string Product_CreateProduct = "Pages.Product.CreateProduct";
        /// <summary>
        /// Product修改权限
        /// </summary>
        public const string Product_EditProduct = "Pages.Product.EditProduct";
        /// <summary>
        /// Product删除权限
        /// </summary>
        public const string Product_DeleteProduct = "Pages.Product.DeleteProduct";

        /// <summary>
        /// Product批量删除权限
        /// </summary>
        public const string Product_BatchDeleteProducts = "Pages.Product.BatchDeleteProducts";

    }

}

