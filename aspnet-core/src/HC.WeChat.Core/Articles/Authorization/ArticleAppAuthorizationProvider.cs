using System.Linq;
using Abp.Authorization;
using Abp.Localization;
using HC.WeChat.Authorization;
using HC.WeChat.Articles;

namespace HC.WeChat.Articles.Authorization
{
    /// <summary>
    /// 权限配置都在这里。
    /// 给权限默认设置服务
    /// See <see cref="ArticleAppPermissions"/> for all permission names.
    /// </summary>
    public class ArticleAppAuthorizationProvider : AuthorizationProvider
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //在这里配置了Article 的权限。
            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var administration = pages.Children.FirstOrDefault(p => p.Name == AppPermissions.Pages_Administration)
                            ?? pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var article = administration.CreateChildPermission(ArticleAppPermissions.Article, L("Article"));
            article.CreateChildPermission(ArticleAppPermissions.Article_CreateArticle, L("CreateArticle"));
            article.CreateChildPermission(ArticleAppPermissions.Article_EditArticle, L("EditArticle"));
            article.CreateChildPermission(ArticleAppPermissions.Article_DeleteArticle, L("DeleteArticle"));
            article.CreateChildPermission(ArticleAppPermissions.Article_BatchDeleteArticles, L("BatchDeleteArticles"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, WeChatConsts.LocalizationSourceName);
        }
    }

}