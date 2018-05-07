using HC.WeChat.UserAnswers;

namespace HC.WeChat.UserAnswers.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="UserAnswerAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class UserAnswerAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// UserAnswer管理权限_自带查询授权
        /// </summary>
        public const string UserAnswer = "Pages.UserAnswer";

        /// <summary>
        /// UserAnswer创建权限
        /// </summary>
        public const string UserAnswer_CreateUserAnswer = "Pages.UserAnswer.CreateUserAnswer";
        /// <summary>
        /// UserAnswer修改权限
        /// </summary>
        public const string UserAnswer_EditUserAnswer = "Pages.UserAnswer.EditUserAnswer";
        /// <summary>
        /// UserAnswer删除权限
        /// </summary>
        public const string UserAnswer_DeleteUserAnswer = "Pages.UserAnswer.DeleteUserAnswer";

        /// <summary>
        /// UserAnswer批量删除权限
        /// </summary>
        public const string UserAnswer_BatchDeleteUserAnswers = "Pages.UserAnswer.BatchDeleteUserAnswers";

    }

}

