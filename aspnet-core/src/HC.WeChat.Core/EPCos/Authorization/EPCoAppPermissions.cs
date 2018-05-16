using HC.WeChat.EPCos;

namespace HC.WeChat.EPCos.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="EPCoAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class EPCoAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// EPCo管理权限_自带查询授权
        /// </summary>
        public const string EPCo = "Pages.EPCo";

        /// <summary>
        /// EPCo创建权限
        /// </summary>
        public const string EPCo_CreateEPCo = "Pages.EPCo.CreateEPCo";
        /// <summary>
        /// EPCo修改权限
        /// </summary>
        public const string EPCo_EditEPCo = "Pages.EPCo.EditEPCo";
        /// <summary>
        /// EPCo删除权限
        /// </summary>
        public const string EPCo_DeleteEPCo = "Pages.EPCo.DeleteEPCo";

        /// <summary>
        /// EPCo批量删除权限
        /// </summary>
        public const string EPCo_BatchDeleteEPCos = "Pages.EPCo.BatchDeleteEPCos";

    }

}

