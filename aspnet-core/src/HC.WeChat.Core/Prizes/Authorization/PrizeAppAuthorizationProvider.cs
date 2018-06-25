using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.Prizes;

namespace HC.WeChat.Prizes.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="PrizeAppPermissions"/> for all permission names.
    /// </summary>
    public class PrizeAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了Prize 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var prize = administration.CreateChildPermission(PrizeAppPermissions.Prize, L("Prize"));
            prize.CreateChildPermission(PrizeAppPermissions.Prize_CreatePrize, L("CreatePrize"));
            prize.CreateChildPermission(PrizeAppPermissions.Prize_EditPrize, L("EditPrize"));
            prize.CreateChildPermission(PrizeAppPermissions.Prize_DeletePrize, L("DeletePrize"));
            prize.CreateChildPermission(PrizeAppPermissions.Prize_BatchDeletePrizes, L("BatchDeletePrizes"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}