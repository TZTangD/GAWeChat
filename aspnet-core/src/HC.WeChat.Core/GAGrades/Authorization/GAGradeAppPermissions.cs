using HC.WeChat.GAGrades;

namespace HC.WeChat.GAGrades.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="GAGradeAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class GAGradeAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// GAGrade管理权限_自带查询授权
        /// </summary>
        public const string GAGrade = "Pages.GAGrade";

        /// <summary>
        /// GAGrade创建权限
        /// </summary>
        public const string GAGrade_CreateGAGrade = "Pages.GAGrade.CreateGAGrade";
        /// <summary>
        /// GAGrade修改权限
        /// </summary>
        public const string GAGrade_EditGAGrade = "Pages.GAGrade.EditGAGrade";
        /// <summary>
        /// GAGrade删除权限
        /// </summary>
        public const string GAGrade_DeleteGAGrade = "Pages.GAGrade.DeleteGAGrade";

        /// <summary>
        /// GAGrade批量删除权限
        /// </summary>
        public const string GAGrade_BatchDeleteGAGrades = "Pages.GAGrade.BatchDeleteGAGrades";

    }

}

