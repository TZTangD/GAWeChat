using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.GAGrades;

namespace HC.WeChat.GAGrades.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="GAGradeAppPermissions"/> for all permission names.
    /// </summary>
    public class GAGradeAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了GAGrade 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var gagrade = administration.CreateChildPermission(GAGradeAppPermissions.GAGrade, L("GAGrade"));
            gagrade.CreateChildPermission(GAGradeAppPermissions.GAGrade_CreateGAGrade, L("CreateGAGrade"));
            gagrade.CreateChildPermission(GAGradeAppPermissions.GAGrade_EditGAGrade, L("EditGAGrade"));
            gagrade.CreateChildPermission(GAGradeAppPermissions.GAGrade_DeleteGAGrade, L("DeleteGAGrade"));
            gagrade.CreateChildPermission(GAGradeAppPermissions.GAGrade_BatchDeleteGAGrades, L("BatchDeleteGAGrades"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}