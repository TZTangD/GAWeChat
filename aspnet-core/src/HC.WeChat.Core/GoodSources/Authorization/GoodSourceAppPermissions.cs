using HC.WeChat.GoodSources;

namespace HC.WeChat.GoodSources.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="GoodSourceAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class GoodSourceAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// GoodSource管理权限_自带查询授权
        /// </summary>
        public const string GoodSource = "Pages.GoodSource";

        /// <summary>
        /// GoodSource创建权限
        /// </summary>
        public const string GoodSource_CreateGoodSource = "Pages.GoodSource.CreateGoodSource";
        /// <summary>
        /// GoodSource修改权限
        /// </summary>
        public const string GoodSource_EditGoodSource = "Pages.GoodSource.EditGoodSource";
        /// <summary>
        /// GoodSource删除权限
        /// </summary>
        public const string GoodSource_DeleteGoodSource = "Pages.GoodSource.DeleteGoodSource";

        /// <summary>
        /// GoodSource批量删除权限
        /// </summary>
        public const string GoodSource_BatchDeleteGoodSources = "Pages.GoodSource.BatchDeleteGoodSources";

    }

}

