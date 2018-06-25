using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.LuckyDraws;

namespace HC.WeChat.LuckyDraws.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="LuckyDrawAppPermissions"/> for all permission names.
    /// </summary>
    public class LuckyDrawAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了LuckyDraw 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var luckydraw = administration.CreateChildPermission(LuckyDrawAppPermissions.LuckyDraw, L("LuckyDraw"));
            luckydraw.CreateChildPermission(LuckyDrawAppPermissions.LuckyDraw_CreateLuckyDraw, L("CreateLuckyDraw"));
            luckydraw.CreateChildPermission(LuckyDrawAppPermissions.LuckyDraw_EditLuckyDraw, L("EditLuckyDraw"));
            luckydraw.CreateChildPermission(LuckyDrawAppPermissions.LuckyDraw_DeleteLuckyDraw, L("DeleteLuckyDraw"));
            luckydraw.CreateChildPermission(LuckyDrawAppPermissions.LuckyDraw_BatchDeleteLuckyDraws, L("BatchDeleteLuckyDraws"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}