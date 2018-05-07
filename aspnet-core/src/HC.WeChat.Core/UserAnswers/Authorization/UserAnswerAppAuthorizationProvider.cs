using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.UserAnswers;

namespace HC.WeChat.UserAnswers.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="UserAnswerAppPermissions"/> for all permission names.
    /// </summary>
    public class UserAnswerAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了UserAnswer 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var useranswer = administration.CreateChildPermission(UserAnswerAppPermissions.UserAnswer, L("UserAnswer"));
            useranswer.CreateChildPermission(UserAnswerAppPermissions.UserAnswer_CreateUserAnswer, L("CreateUserAnswer"));
            useranswer.CreateChildPermission(UserAnswerAppPermissions.UserAnswer_EditUserAnswer, L("EditUserAnswer"));
            useranswer.CreateChildPermission(UserAnswerAppPermissions.UserAnswer_DeleteUserAnswer, L("DeleteUserAnswer"));
            useranswer.CreateChildPermission(UserAnswerAppPermissions.UserAnswer_BatchDeleteUserAnswers, L("BatchDeleteUserAnswers"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}