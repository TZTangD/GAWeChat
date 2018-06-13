using HC.WeChat.LevelLogs;

namespace HC.WeChat.LevelLogs.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="LevelLogAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class LevelLogAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// LevelLog管理权限_自带查询授权
        /// </summary>
        public const string LevelLog = "Pages.LevelLog";

        /// <summary>
        /// LevelLog创建权限
        /// </summary>
        public const string LevelLog_CreateLevelLog = "Pages.LevelLog.CreateLevelLog";
        /// <summary>
        /// LevelLog修改权限
        /// </summary>
        public const string LevelLog_EditLevelLog = "Pages.LevelLog.EditLevelLog";
        /// <summary>
        /// LevelLog删除权限
        /// </summary>
        public const string LevelLog_DeleteLevelLog = "Pages.LevelLog.DeleteLevelLog";

        /// <summary>
        /// LevelLog批量删除权限
        /// </summary>
        public const string LevelLog_BatchDeleteLevelLogs = "Pages.LevelLog.BatchDeleteLevelLogs";

    }

}

