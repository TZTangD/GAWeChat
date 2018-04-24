using HC.WeChat.Articles;

namespace HC.WeChat.Articles.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="ArticleAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class ArticleAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// Article管理权限_自带查询授权
        /// </summary>
        public const string Article = "Pages.Article";

        /// <summary>
        /// Article创建权限
        /// </summary>
        public const string Article_CreateArticle = "Pages.Article.CreateArticle";
        /// <summary>
        /// Article修改权限
        /// </summary>
        public const string Article_EditArticle = "Pages.Article.EditArticle";
        /// <summary>
        /// Article删除权限
        /// </summary>
        public const string Article_DeleteArticle = "Pages.Article.DeleteArticle";

        /// <summary>
        /// Article批量删除权限
        /// </summary>
        public const string Article_BatchDeleteArticles = "Pages.Article.BatchDeleteArticles";

    }

}

