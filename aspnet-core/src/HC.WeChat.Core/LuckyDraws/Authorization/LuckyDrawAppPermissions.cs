using HC.WeChat.LuckyDraws;

namespace HC.WeChat.LuckyDraws.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="LuckyDrawAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class LuckyDrawAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// LuckyDraw管理权限_自带查询授权
        /// </summary>
        public const string LuckyDraw = "Pages.LuckyDraw";

        /// <summary>
        /// LuckyDraw创建权限
        /// </summary>
        public const string LuckyDraw_CreateLuckyDraw = "Pages.LuckyDraw.CreateLuckyDraw";
        /// <summary>
        /// LuckyDraw修改权限
        /// </summary>
        public const string LuckyDraw_EditLuckyDraw = "Pages.LuckyDraw.EditLuckyDraw";
        /// <summary>
        /// LuckyDraw删除权限
        /// </summary>
        public const string LuckyDraw_DeleteLuckyDraw = "Pages.LuckyDraw.DeleteLuckyDraw";

        /// <summary>
        /// LuckyDraw批量删除权限
        /// </summary>
        public const string LuckyDraw_BatchDeleteLuckyDraws = "Pages.LuckyDraw.BatchDeleteLuckyDraws";

    }

}

