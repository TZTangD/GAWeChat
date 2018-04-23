using HC.WeChat.UserQuestions;

namespace HC.WeChat.UserQuestions.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="UserQuestionAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class UserQuestionAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// UserQuestion管理权限_自带查询授权
        /// </summary>
        public const string UserQuestion = "Pages.UserQuestion";

        /// <summary>
        /// UserQuestion创建权限
        /// </summary>
        public const string UserQuestion_CreateUserQuestion = "Pages.UserQuestion.CreateUserQuestion";
        /// <summary>
        /// UserQuestion修改权限
        /// </summary>
        public const string UserQuestion_EditUserQuestion = "Pages.UserQuestion.EditUserQuestion";
        /// <summary>
        /// UserQuestion删除权限
        /// </summary>
        public const string UserQuestion_DeleteUserQuestion = "Pages.UserQuestion.DeleteUserQuestion";

        /// <summary>
        /// UserQuestion批量删除权限
        /// </summary>
        public const string UserQuestion_BatchDeleteUserQuestions = "Pages.UserQuestion.BatchDeleteUserQuestions";

    }

}

