using HC.WeChat.Activities;

namespace HC.WeChat.Activities.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="ActivityAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class ActivityAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// Activity管理权限_自带查询授权
        /// </summary>
        public const string Activity = "Pages.Activity";

        /// <summary>
        /// Activity创建权限
        /// </summary>
        public const string Activity_CreateActivity = "Pages.Activity.CreateActivity";
        /// <summary>
        /// Activity修改权限
        /// </summary>
        public const string Activity_EditActivity = "Pages.Activity.EditActivity";
        /// <summary>
        /// Activity删除权限
        /// </summary>
        public const string Activity_DeleteActivity = "Pages.Activity.DeleteActivity";

        /// <summary>
        /// Activity批量删除权限
        /// </summary>
        public const string Activity_BatchDeleteActivities = "Pages.Activity.BatchDeleteActivities";

    }

}

