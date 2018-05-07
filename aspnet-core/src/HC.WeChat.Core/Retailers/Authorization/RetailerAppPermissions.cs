using HC.WeChat.Retailers;

namespace HC.WeChat.Retailers.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="RetailerAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class RetailerAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// Retailer管理权限_自带查询授权
        /// </summary>
        public const string Retailer = "Pages.Retailer";

        /// <summary>
        /// Retailer创建权限
        /// </summary>
        public const string Retailer_CreateRetailer = "Pages.Retailer.CreateRetailer";
        /// <summary>
        /// Retailer修改权限
        /// </summary>
        public const string Retailer_EditRetailer = "Pages.Retailer.EditRetailer";
        /// <summary>
        /// Retailer删除权限
        /// </summary>
        public const string Retailer_DeleteRetailer = "Pages.Retailer.DeleteRetailer";

        /// <summary>
        /// Retailer批量删除权限
        /// </summary>
        public const string Retailer_BatchDeleteRetailers = "Pages.Retailer.BatchDeleteRetailers";

    }

}

