using HC.WeChat.Employees;

namespace HC.WeChat.Employees.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="EmployeeAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class EmployeeAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// Employee管理权限_自带查询授权
        /// </summary>
        public const string Employee = "Pages.Employee";

        /// <summary>
        /// Employee创建权限
        /// </summary>
        public const string Employee_CreateEmployee = "Pages.Employee.CreateEmployee";
        /// <summary>
        /// Employee修改权限
        /// </summary>
        public const string Employee_EditEmployee = "Pages.Employee.EditEmployee";
        /// <summary>
        /// Employee删除权限
        /// </summary>
        public const string Employee_DeleteEmployee = "Pages.Employee.DeleteEmployee";

        /// <summary>
        /// Employee批量删除权限
        /// </summary>
        public const string Employee_BatchDeleteEmployees = "Pages.Employee.BatchDeleteEmployees";

    }

}

