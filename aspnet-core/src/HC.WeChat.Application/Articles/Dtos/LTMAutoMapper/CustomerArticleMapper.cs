using AutoMapper;

namespace HC.WeChat.Articles.Dtos.LTMAutoMapper
{
    using HC.WeChat.Articles;

    /// <summary>
    /// 配置Article的AutoMapper
    /// </summary>
    internal static class CustomerArticleMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <Article, ArticleDto>();
            configuration.CreateMap<Article, ArticleListDto>();
            configuration.CreateMap<ArticleEditDto, Article>();
            // configuration.CreateMap<CreateArticleInput, Article>();
            //        configuration.CreateMap<Article, GetArticleForEditOutput>();
        }
    }
}