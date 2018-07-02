using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;

namespace HC.WeChat.QrCodeLogs.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="QrCodeLogAppPermissions"/> for all permission names.
    /// </summary>
    public class QrCodeLogAppAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
                          //在这里配置了QrCodeLog 的权限。


            var pages = context.GetPermissionOrNull(AppLtmPermissions.Pages) ?? context.CreatePermission(AppLtmPermissions.Pages, L("Pages"));

 
            var administration = pages.Children.FirstOrDefault(p => p.Name == AppLtmPermissions.Pages_Administration) 
                ?? pages.CreateChildPermission(AppLtmPermissions.Pages_Administration, L("Administration"));

        var qrcodelog = administration.CreateChildPermission(QrCodeLogAppPermissions.QrCodeLog , L("QrCodeLog"));
            qrcodelog.CreateChildPermission(QrCodeLogAppPermissions.QrCodeLog_CreateQrCodeLog, L("CreateQrCodeLog"));
            qrcodelog.CreateChildPermission(QrCodeLogAppPermissions.QrCodeLog_EditQrCodeLog, L("EditQrCodeLog"));           
            qrcodelog.CreateChildPermission(QrCodeLogAppPermissions. QrCodeLog_DeleteQrCodeLog, L("DeleteQrCodeLog"));
     qrcodelog.CreateChildPermission(QrCodeLogAppPermissions. QrCodeLog_BatchDeleteQrCodeLogs , L("BatchDeleteQrCodeLogs"));
 


        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }




}