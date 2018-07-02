using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;

namespace HC.WeChat.Exhibitions.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="ExhibitionAppPermissions"/> for all permission names.
    /// </summary>
    public class ExhibitionAppAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
                          //在这里配置了Exhibition 的权限。


            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

 
            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration) 
                ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

        var exhibition = administration.CreateChildPermission(ExhibitionAppPermissions.Exhibition , L("Exhibition"));
            exhibition.CreateChildPermission(ExhibitionAppPermissions.Exhibition_CreateExhibition, L("CreateExhibition"));
            exhibition.CreateChildPermission(ExhibitionAppPermissions.Exhibition_EditExhibition, L("EditExhibition"));           
            exhibition.CreateChildPermission(ExhibitionAppPermissions. Exhibition_DeleteExhibition, L("DeleteExhibition"));
     exhibition.CreateChildPermission(ExhibitionAppPermissions. Exhibition_BatchDeleteExhibitions , L("BatchDeleteExhibitions"));
 


        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }




}