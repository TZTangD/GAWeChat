using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.Employees;

namespace HC.WeChat.Employees.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="EmployeeAppPermissions"/> for all permission names.
    /// </summary>
    public class EmployeeAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了Employee 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var employee = administration.CreateChildPermission(EmployeeAppPermissions.Employee, L("Employee"));
            employee.CreateChildPermission(EmployeeAppPermissions.Employee_CreateEmployee, L("CreateEmployee"));
            employee.CreateChildPermission(EmployeeAppPermissions.Employee_EditEmployee, L("EditEmployee"));
            employee.CreateChildPermission(EmployeeAppPermissions.Employee_DeleteEmployee, L("DeleteEmployee"));
            employee.CreateChildPermission(EmployeeAppPermissions.Employee_BatchDeleteEmployees, L("BatchDeleteEmployees"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}