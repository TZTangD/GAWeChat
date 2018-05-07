using HC.WeChat.ActivityFormLogs;

namespace HC.WeChat.ActivityFormLogs.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="ActivityFormLogAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class ActivityFormLogAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// ActivityFormLog管理权限_自带查询授权
        /// </summary>
        public const string ActivityFormLog = "Pages.ActivityFormLog";

        /// <summary>
        /// ActivityFormLog创建权限
        /// </summary>
        public const string ActivityFormLog_CreateActivityFormLog = "Pages.ActivityFormLog.CreateActivityFormLog";
        /// <summary>
        /// ActivityFormLog修改权限
        /// </summary>
        public const string ActivityFormLog_EditActivityFormLog = "Pages.ActivityFormLog.EditActivityFormLog";
        /// <summary>
        /// ActivityFormLog删除权限
        /// </summary>
        public const string ActivityFormLog_DeleteActivityFormLog = "Pages.ActivityFormLog.DeleteActivityFormLog";

        /// <summary>
        /// ActivityFormLog批量删除权限
        /// </summary>
        public const string ActivityFormLog_BatchDeleteActivityFormLogs = "Pages.ActivityFormLog.BatchDeleteActivityFormLogs";

    }

}

