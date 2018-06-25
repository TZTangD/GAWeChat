using HC.WeChat.Prizes;

namespace HC.WeChat.Prizes.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="PrizeAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class PrizeAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// Prize管理权限_自带查询授权
        /// </summary>
        public const string Prize = "Pages.Prize";

        /// <summary>
        /// Prize创建权限
        /// </summary>
        public const string Prize_CreatePrize = "Pages.Prize.CreatePrize";
        /// <summary>
        /// Prize修改权限
        /// </summary>
        public const string Prize_EditPrize = "Pages.Prize.EditPrize";
        /// <summary>
        /// Prize删除权限
        /// </summary>
        public const string Prize_DeletePrize = "Pages.Prize.DeletePrize";

        /// <summary>
        /// Prize批量删除权限
        /// </summary>
        public const string Prize_BatchDeletePrizes = "Pages.Prize.BatchDeletePrizes";

    }

}

