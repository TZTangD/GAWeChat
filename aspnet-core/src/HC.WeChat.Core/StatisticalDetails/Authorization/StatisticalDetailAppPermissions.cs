using HC.WeChat.StatisticalDetails;

namespace HC.WeChat.StatisticalDetails.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="StatisticalDetailAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class StatisticalDetailAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// StatisticalDetail管理权限_自带查询授权
        /// </summary>
        public const string StatisticalDetail = "Pages.StatisticalDetail";

        /// <summary>
        /// StatisticalDetail创建权限
        /// </summary>
        public const string StatisticalDetail_CreateStatisticalDetail = "Pages.StatisticalDetail.CreateStatisticalDetail";
        /// <summary>
        /// StatisticalDetail修改权限
        /// </summary>
        public const string StatisticalDetail_EditStatisticalDetail = "Pages.StatisticalDetail.EditStatisticalDetail";
        /// <summary>
        /// StatisticalDetail删除权限
        /// </summary>
        public const string StatisticalDetail_DeleteStatisticalDetail = "Pages.StatisticalDetail.DeleteStatisticalDetail";

        /// <summary>
        /// StatisticalDetail批量删除权限
        /// </summary>
        public const string StatisticalDetail_BatchDeleteStatisticalDetails = "Pages.StatisticalDetail.BatchDeleteStatisticalDetails";

    }

}

