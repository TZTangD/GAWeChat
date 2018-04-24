using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.PurchaseRecords;

namespace HC.WeChat.PurchaseRecords.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="PurchaseRecordAppPermissions"/> for all permission names.
    /// </summary>
    public class PurchaseRecordAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了PurchaseRecord 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var purchaserecord = administration.CreateChildPermission(PurchaseRecordAppPermissions.PurchaseRecord, L("PurchaseRecord"));
            purchaserecord.CreateChildPermission(PurchaseRecordAppPermissions.PurchaseRecord_CreatePurchaseRecord, L("CreatePurchaseRecord"));
            purchaserecord.CreateChildPermission(PurchaseRecordAppPermissions.PurchaseRecord_EditPurchaseRecord, L("EditPurchaseRecord"));
            purchaserecord.CreateChildPermission(PurchaseRecordAppPermissions.PurchaseRecord_DeletePurchaseRecord, L("DeletePurchaseRecord"));
            purchaserecord.CreateChildPermission(PurchaseRecordAppPermissions.PurchaseRecord_BatchDeletePurchaseRecords, L("BatchDeletePurchaseRecords"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}