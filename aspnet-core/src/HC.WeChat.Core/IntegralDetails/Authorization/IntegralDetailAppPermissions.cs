using HC.WeChat.IntegralDetails;

namespace HC.WeChat.IntegralDetails.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="IntegralDetailAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class IntegralDetailAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// IntegralDetail管理权限_自带查询授权
        /// </summary>
        public const string IntegralDetail = "Pages.IntegralDetail";

        /// <summary>
        /// IntegralDetail创建权限
        /// </summary>
        public const string IntegralDetail_CreateIntegralDetail = "Pages.IntegralDetail.CreateIntegralDetail";
        /// <summary>
        /// IntegralDetail修改权限
        /// </summary>
        public const string IntegralDetail_EditIntegralDetail = "Pages.IntegralDetail.EditIntegralDetail";
        /// <summary>
        /// IntegralDetail删除权限
        /// </summary>
        public const string IntegralDetail_DeleteIntegralDetail = "Pages.IntegralDetail.DeleteIntegralDetail";

        /// <summary>
        /// IntegralDetail批量删除权限
        /// </summary>
        public const string IntegralDetail_BatchDeleteIntegralDetails = "Pages.IntegralDetail.BatchDeleteIntegralDetails";

    }

}

