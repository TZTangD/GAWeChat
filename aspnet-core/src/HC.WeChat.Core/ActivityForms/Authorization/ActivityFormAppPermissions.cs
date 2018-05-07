using HC.WeChat.ActivityForms;

namespace HC.WeChat.ActivityForms.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="ActivityFormAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class ActivityFormAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// ActivityForm管理权限_自带查询授权
        /// </summary>
        public const string ActivityForm = "Pages.ActivityForm";

        /// <summary>
        /// ActivityForm创建权限
        /// </summary>
        public const string ActivityForm_CreateActivityForm = "Pages.ActivityForm.CreateActivityForm";
        /// <summary>
        /// ActivityForm修改权限
        /// </summary>
        public const string ActivityForm_EditActivityForm = "Pages.ActivityForm.EditActivityForm";
        /// <summary>
        /// ActivityForm删除权限
        /// </summary>
        public const string ActivityForm_DeleteActivityForm = "Pages.ActivityForm.DeleteActivityForm";

        /// <summary>
        /// ActivityForm批量删除权限
        /// </summary>
        public const string ActivityForm_BatchDeleteActivityForms = "Pages.ActivityForm.BatchDeleteActivityForms";

    }

}

