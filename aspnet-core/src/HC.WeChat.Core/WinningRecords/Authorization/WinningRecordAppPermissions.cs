using HC.WeChat.WinningRecords;

namespace HC.WeChat.WinningRecords.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="WinningRecordAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class WinningRecordAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// WinningRecord管理权限_自带查询授权
        /// </summary>
        public const string WinningRecord = "Pages.WinningRecord";

        /// <summary>
        /// WinningRecord创建权限
        /// </summary>
        public const string WinningRecord_CreateWinningRecord = "Pages.WinningRecord.CreateWinningRecord";
        /// <summary>
        /// WinningRecord修改权限
        /// </summary>
        public const string WinningRecord_EditWinningRecord = "Pages.WinningRecord.EditWinningRecord";
        /// <summary>
        /// WinningRecord删除权限
        /// </summary>
        public const string WinningRecord_DeleteWinningRecord = "Pages.WinningRecord.DeleteWinningRecord";

        /// <summary>
        /// WinningRecord批量删除权限
        /// </summary>
        public const string WinningRecord_BatchDeleteWinningRecords = "Pages.WinningRecord.BatchDeleteWinningRecords";

    }

}

