using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.UserQuestions;

namespace HC.WeChat.UserQuestions.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="UserQuestionAppPermissions"/> for all permission names.
    /// </summary>
    public class UserQuestionAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了UserQuestion 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var userquestion = administration.CreateChildPermission(UserQuestionAppPermissions.UserQuestion, L("UserQuestion"));
            userquestion.CreateChildPermission(UserQuestionAppPermissions.UserQuestion_CreateUserQuestion, L("CreateUserQuestion"));
            userquestion.CreateChildPermission(UserQuestionAppPermissions.UserQuestion_EditUserQuestion, L("EditUserQuestion"));
            userquestion.CreateChildPermission(UserQuestionAppPermissions.UserQuestion_DeleteUserQuestion, L("DeleteUserQuestion"));
            userquestion.CreateChildPermission(UserQuestionAppPermissions.UserQuestion_BatchDeleteUserQuestions, L("BatchDeleteUserQuestions"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}