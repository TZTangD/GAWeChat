using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HC.WeChat.Articles.Dtos;
using HC.WeChat.Articles;
using System;

namespace HC.WeChat.Articles
{
    /// <summary>
    /// Article应用层服务的接口方法
    /// </summary>
    public interface IArticleAppService : IApplicationService
    {
        /// <summary>
        /// 获取Article的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<ArticleListDto>> GetPagedArticles(GetArticlesInput input);

        /// <summary>
        /// 通过指定id获取ArticleListDto信息
        /// </summary>
        Task<ArticleListDto> GetArticleByIdAsync(EntityDto<Guid> input);

        /// <summary>
        /// 导出Article为excel表
        /// </summary>
        /// <returns></returns>
        //  Task<FileDto> GetArticlesToExcel();
        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<GetArticleForEditOutput> GetArticleForEdit(NullableIdDto<Guid> input);

        //todo:缺少Dto的生成GetArticleForEditOutput
        /// <summary>
        /// 添加或者修改Article的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateOrUpdateArticle(CreateOrUpdateArticleInput input);

        /// <summary>
        /// 删除Article信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteArticle(EntityDto<Guid> input);

        /// <summary>
        /// 批量删除Article
        /// </summary>
        Task BatchDeleteArticlesAsync(List<Guid> input);

        /// <summary>
        /// 添加或者修改Article的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<ArticleEditDto> CreateOrUpdateArticleDto(ArticleEditDto input);

        /// <summary>
        /// 获取Article的分页列表信息(经验分享)
        /// </summary>
        /// <param name="input">查询条件</param>
        /// <returns></returns>
        Task<PagedResultDto<ArticleListDto>> GetPagedArticlesForExperience(GetArticlesInput input);

        Task<List<ArticleListDto>> GetWXPagedArticlesAsync(int? tenantId, int pageIndex, int pageSize);
        Task<ArticleListDto> GetWXArticlesByIdAsync(Guid id, int? tenantId);
        Task<List<ArticleListDto>> GetWXPagedExpAsync(int? tenantId, int pageIndex, int pageSize);
        Task<ArticleListDto> GetWXExpByIdAsync(Guid id, int? tenantId);
    }
}
