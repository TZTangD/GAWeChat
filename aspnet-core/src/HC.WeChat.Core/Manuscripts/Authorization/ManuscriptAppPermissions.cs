using HC.WeChat.Manuscripts;

namespace HC.WeChat.Manuscripts.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="ManuscriptAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class ManuscriptAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// Manuscript管理权限_自带查询授权
        /// </summary>
        public const string Manuscript = "Pages.Manuscript";

        /// <summary>
        /// Manuscript创建权限
        /// </summary>
        public const string Manuscript_CreateManuscript = "Pages.Manuscript.CreateManuscript";
        /// <summary>
        /// Manuscript修改权限
        /// </summary>
        public const string Manuscript_EditManuscript = "Pages.Manuscript.EditManuscript";
        /// <summary>
        /// Manuscript删除权限
        /// </summary>
        public const string Manuscript_DeleteManuscript = "Pages.Manuscript.DeleteManuscript";

        /// <summary>
        /// Manuscript批量删除权限
        /// </summary>
        public const string Manuscript_BatchDeleteManuscripts = "Pages.Manuscript.BatchDeleteManuscripts";

    }

}

