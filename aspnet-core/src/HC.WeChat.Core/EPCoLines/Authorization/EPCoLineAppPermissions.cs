using HC.WeChat.EPCoLines;

namespace HC.WeChat.EPCoLines.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="EPCoLineAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class EPCoLineAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// EPCoLine管理权限_自带查询授权
        /// </summary>
        public const string EPCoLine = "Pages.EPCoLine";

        /// <summary>
        /// EPCoLine创建权限
        /// </summary>
        public const string EPCoLine_CreateEPCoLine = "Pages.EPCoLine.CreateEPCoLine";
        /// <summary>
        /// EPCoLine修改权限
        /// </summary>
        public const string EPCoLine_EditEPCoLine = "Pages.EPCoLine.EditEPCoLine";
        /// <summary>
        /// EPCoLine删除权限
        /// </summary>
        public const string EPCoLine_DeleteEPCoLine = "Pages.EPCoLine.DeleteEPCoLine";

        /// <summary>
        /// EPCoLine批量删除权限
        /// </summary>
        public const string EPCoLine_BatchDeleteEPCoLines = "Pages.EPCoLine.BatchDeleteEPCoLines";

    }

}

