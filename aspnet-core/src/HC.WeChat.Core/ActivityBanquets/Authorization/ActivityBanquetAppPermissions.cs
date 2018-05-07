using HC.WeChat.ActivityBanquets;

namespace HC.WeChat.ActivityBanquets.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="ActivityBanquetAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class ActivityBanquetAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// ActivityBanquet管理权限_自带查询授权
        /// </summary>
        public const string ActivityBanquet = "Pages.ActivityBanquet";

        /// <summary>
        /// ActivityBanquet创建权限
        /// </summary>
        public const string ActivityBanquet_CreateActivityBanquet = "Pages.ActivityBanquet.CreateActivityBanquet";
        /// <summary>
        /// ActivityBanquet修改权限
        /// </summary>
        public const string ActivityBanquet_EditActivityBanquet = "Pages.ActivityBanquet.EditActivityBanquet";
        /// <summary>
        /// ActivityBanquet删除权限
        /// </summary>
        public const string ActivityBanquet_DeleteActivityBanquet = "Pages.ActivityBanquet.DeleteActivityBanquet";

        /// <summary>
        /// ActivityBanquet批量删除权限
        /// </summary>
        public const string ActivityBanquet_BatchDeleteActivityBanquets = "Pages.ActivityBanquet.BatchDeleteActivityBanquets";

    }

}

