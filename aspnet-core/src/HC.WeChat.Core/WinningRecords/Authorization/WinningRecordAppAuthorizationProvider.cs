using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.WinningRecords;

namespace HC.WeChat.WinningRecords.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="WinningRecordAppPermissions"/> for all permission names.
    /// </summary>
    public class WinningRecordAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了WinningRecord 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var winningrecord = administration.CreateChildPermission(WinningRecordAppPermissions.WinningRecord, L("WinningRecord"));
            winningrecord.CreateChildPermission(WinningRecordAppPermissions.WinningRecord_CreateWinningRecord, L("CreateWinningRecord"));
            winningrecord.CreateChildPermission(WinningRecordAppPermissions.WinningRecord_EditWinningRecord, L("EditWinningRecord"));
            winningrecord.CreateChildPermission(WinningRecordAppPermissions.WinningRecord_DeleteWinningRecord, L("DeleteWinningRecord"));
            winningrecord.CreateChildPermission(WinningRecordAppPermissions.WinningRecord_BatchDeleteWinningRecords, L("BatchDeleteWinningRecords"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}