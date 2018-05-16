using HC.WeChat.GACustPoints;

namespace HC.WeChat.GACustPoints.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="GACustPointAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class GACustPointAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// GACustPoint管理权限_自带查询授权
        /// </summary>
        public const string GACustPoint = "Pages.GACustPoint";

        /// <summary>
        /// GACustPoint创建权限
        /// </summary>
        public const string GACustPoint_CreateGACustPoint = "Pages.GACustPoint.CreateGACustPoint";
        /// <summary>
        /// GACustPoint修改权限
        /// </summary>
        public const string GACustPoint_EditGACustPoint = "Pages.GACustPoint.EditGACustPoint";
        /// <summary>
        /// GACustPoint删除权限
        /// </summary>
        public const string GACustPoint_DeleteGACustPoint = "Pages.GACustPoint.DeleteGACustPoint";

        /// <summary>
        /// GACustPoint批量删除权限
        /// </summary>
        public const string GACustPoint_BatchDeleteGACustPoints = "Pages.GACustPoint.BatchDeleteGACustPoints";

    }

}

