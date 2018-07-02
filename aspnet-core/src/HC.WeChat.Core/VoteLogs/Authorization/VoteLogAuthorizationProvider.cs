using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;

namespace HC.WeChat.VoteLogs.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="VoteLogAppPermissions"/> for all permission names.
    /// </summary>
    public class VoteLogAppAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了VoteLog 的权限。


            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));


            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var votelog = administration.CreateChildPermission(VoteLogAppPermissions.VoteLog, L("VoteLog"));
            votelog.CreateChildPermission(VoteLogAppPermissions.VoteLog_CreateVoteLog, L("CreateVoteLog"));
            votelog.CreateChildPermission(VoteLogAppPermissions.VoteLog_EditVoteLog, L("EditVoteLog"));
            votelog.CreateChildPermission(VoteLogAppPermissions.VoteLog_DeleteVoteLog, L("DeleteVoteLog"));
            votelog.CreateChildPermission(VoteLogAppPermissions.VoteLog_BatchDeleteVoteLogs, L("BatchDeleteVoteLogs"));



        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }




}