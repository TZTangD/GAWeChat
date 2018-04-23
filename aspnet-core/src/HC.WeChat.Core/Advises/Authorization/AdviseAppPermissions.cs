using HC.WeChat.Advises;

namespace HC.WeChat.Advises.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="AdviseAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class AdviseAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// Advise管理权限_自带查询授权
        /// </summary>
        public const string Advise = "Pages.Advise";

        /// <summary>
        /// Advise创建权限
        /// </summary>
        public const string Advise_CreateAdvise = "Pages.Advise.CreateAdvise";
        /// <summary>
        /// Advise修改权限
        /// </summary>
        public const string Advise_EditAdvise = "Pages.Advise.EditAdvise";
        /// <summary>
        /// Advise删除权限
        /// </summary>
        public const string Advise_DeleteAdvise = "Pages.Advise.DeleteAdvise";

        /// <summary>
        /// Advise批量删除权限
        /// </summary>
        public const string Advise_BatchDeleteAdvises = "Pages.Advise.BatchDeleteAdvises";

    }

}

