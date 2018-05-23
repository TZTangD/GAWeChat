using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using System.Linq;

using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using HC.WeChat.Articles.Authorization;
using HC.WeChat.Articles.Dtos;
using HC.WeChat.Articles.DomainServices;
using HC.WeChat.Articles;
using System;
using HC.WeChat.WechatEnums;
using HC.WeChat.Authorization;
using HC.WeChat.StatisticalDetails;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.Web;

namespace HC.WeChat.Articles
{
    /// <summary>
    /// Article应用层服务的接口实现方法
    /// </summary>
    //[AbpAuthorize(ArticleAppPermissions.Article)]
    [AbpAuthorize(AppPermissions.Pages)]
    public class ArticleAppService : WeChatAppServiceBase, IArticleAppService
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<Article, Guid> _articleRepository;
        private readonly IArticleManager _articleManager;
        private readonly IRepository<StatisticalDetail, Guid> _statisticaldetailRepository;
        private readonly IHostingEnvironment _hostingEnvironment;


        /// <summary>
        /// 构造函数
        /// </summary>
        public ArticleAppService(IRepository<Article, Guid> articleRepository
      , IArticleManager articleManager
            , IRepository<StatisticalDetail, Guid> statisticaldetailRepository
            , IHostingEnvironment hostingEnvironment
        )
        {
            _statisticaldetailRepository = statisticaldetailRepository;
            _articleRepository = articleRepository;
            _articleManager = articleManager;
            _hostingEnvironment = hostingEnvironment;
        }

        /// <summary>
        /// 获取Article的分页列表信息（营销活动 ）
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<ArticleListDto>> GetPagedArticles(GetArticlesInput input)
        {

            var query = _articleRepository.GetAll()
                .Where(a => a.Type == ArticleTypeEnum.营销活动)
                .WhereIf(!string.IsNullOrEmpty(input.Name), a => a.Title.Contains(input.Name))
                .WhereIf(!string.IsNullOrEmpty(input.Author), a => a.Author.Contains(input.Author))
                .WhereIf(input.Status.HasValue, a => a.PushStatus == input.Status);
            //TODO:根据传入的参数添加过滤条件
            var articleCount = await query.CountAsync();

            var articles = await query
                .OrderByDescending(a => a.PushTime)
                .ThenByDescending(a => a.CreationTime)
                .ThenBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();

            //var articleListDtos = ObjectMapper.Map<List <ArticleListDto>>(articles);
            var articleListDtos = articles.MapTo<List<ArticleListDto>>();

            return new PagedResultDto<ArticleListDto>(
                articleCount,
                articleListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取ArticleListDto信息
        /// </summary>
        public async Task<ArticleListDto> GetArticleByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _articleRepository.GetAsync(input.Id);

            return entity.MapTo<ArticleListDto>();
        }

        /// <summary>
        /// 导出Article为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetArticlesToExcel(){
        //var users = await UserManager.Users.ToListAsync();
        //var userListDtos = ObjectMapper.Map<List<UserListDto>>(users);
        //await FillRoleNames(userListDtos);
        //return _userListExcelExporter.ExportToFile(userListDtos);
        //}
        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<GetArticleForEditOutput> GetArticleForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetArticleForEditOutput();
            ArticleEditDto articleEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _articleRepository.GetAsync(input.Id.Value);

                articleEditDto = entity.MapTo<ArticleEditDto>();

                //articleEditDto = ObjectMapper.Map<List <articleEditDto>>(entity);
            }
            else
            {
                articleEditDto = new ArticleEditDto();
            }

            output.Article = articleEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改Article的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateArticle(CreateOrUpdateArticleInput input)
        {

            if (input.Article.Id.HasValue)
            {
                await UpdateArticleAsync(input.Article);
            }
            else
            {
                await CreateArticleAsync(input.Article);
            }
        }

        /// <summary>
        /// 新增Article
        /// </summary>
        //[AbpAuthorize(ArticleAppPermissions.Article_CreateArticle)]
        protected virtual async Task<ArticleEditDto> CreateArticleAsync(ArticleEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<Article>(input);

            entity = await _articleRepository.InsertAsync(entity);
            return entity.MapTo<ArticleEditDto>();
        }

        /// <summary>
        /// 编辑Article
        /// </summary>
        //[AbpAuthorize(ArticleAppPermissions.Article_EditArticle)]
        protected virtual async Task<ArticleEditDto> UpdateArticleAsync(ArticleEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _articleRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);
            //string sWebRootFolder = _hostingEnvironment.WebRootPath;
            //string path = Path.Combine(sWebRootFolder, "upload/activity", entity.Id.ToString() + ".html");
            //using (StreamWriter sw = new StreamWriter(path)) // 把HTML内容写入文件
            //{
            //    var html = HttpUtility.UrlDecode(input.Content); // url 解码
            //    await sw.WriteAsync(html);
            //}
            //var fileDire = sWebRootFolder + string.Format("/upload/activity/", entity.Id.ToString() + ".html");
            //entity.Content = fileDire;
            // ObjectMapper.Map(input, entity);
            var result = await _articleRepository.UpdateAsync(entity);
            return result.MapTo<ArticleEditDto>();
        }

        /// <summary>
        /// 删除Article信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        //[AbpAuthorize(ArticleAppPermissions.Article_DeleteArticle)]
        public async Task DeleteArticle(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _articleRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除Article的方法
        /// </summary>
        //[AbpAuthorize(ArticleAppPermissions.Article_BatchDeleteArticles)]
        public async Task BatchDeleteArticlesAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _articleRepository.DeleteAsync(s => input.Contains(s.Id));
        }

        /// <summary>
        /// 添加或者修改Article的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<ArticleEditDto> CreateOrUpdateArticleDto(ArticleEditDto input)
        {
            if (input.Id.HasValue)
            {
                return await UpdateArticleAsync(input);
            }
            else
            {
                return await CreateArticleAsync(input);
            }
        }

        /// <summary>
        /// 获取Article的分页列表信息(经验分享)
        /// </summary>
        /// <param name="input">查询条件</param>
        /// <returns></returns>
        public async Task<PagedResultDto<ArticleListDto>> GetPagedArticlesForExperience(GetArticlesInput input)
        {

            var query = _articleRepository.GetAll()
                .Where(a => a.Type == ArticleTypeEnum.经验分享)
                .WhereIf(!string.IsNullOrEmpty(input.Name), a => a.Title.Contains(input.Name))
                .WhereIf(!string.IsNullOrEmpty(input.Author), a => a.Author.Contains(input.Author))
                .WhereIf(input.Status.HasValue, a => a.PushStatus == input.Status);
            //TODO:根据传入的参数添加过滤条件
            var articleCount = await query.CountAsync();

            var articles = await query
                .OrderByDescending(a => a.PushTime)
                .ThenByDescending(a => a.CreationTime)
                .ThenBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();

            //var articleListDtos = ObjectMapper.Map<List <ArticleListDto>>(articles);
            var articleListDtos = articles.MapTo<List<ArticleListDto>>();

            return new PagedResultDto<ArticleListDto>(
                articleCount,
                articleListDtos
                );
        }

        /// <summary>
        /// 微信获取营销活动列表
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [AbpAllowAnonymous]
        public async Task<List<ArticleListDto>> GetWXPagedArticlesAsync(int? tenantId, int pageIndex, int pageSize)
        {
            using (CurrentUnitOfWork.SetTenantId(tenantId))
            {
                var query = _articleRepository.GetAll().Where(a => a.Type == ArticleTypeEnum.营销活动&&a.PushStatus==ArticlePushStatusEnum.已发布);
                var entity = from a in query
                             select new ArticleListDto()
                             {
                                 Id = a.Id,
                                 Title = a.Title,
                                 PushTime = a.PushTime,
                                 Content = a.Content,
                                 CoverPhoto = a.CoverPhoto
                             };
                return await entity.OrderByDescending(q => q.PushTime).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
            }
        }

        /// <summary>
        /// 根据Id获取营销活动详情
        /// </summary>
        /// <param name="id"></param>
        /// <param name="tenantId"></param>
        /// <returns></returns>
        [AbpAllowAnonymous]
        public async Task<ArticleListDto> GetWXArticlesByIdAsync(Guid id, int? tenantId)
        {
            using (CurrentUnitOfWork.SetTenantId(tenantId))
            {
                var result = await _articleRepository.GetAll().Where(a => a.Id == id).FirstOrDefaultAsync();
                return result.MapTo<ArticleListDto>();
            }
        }

        /// <summary>
        /// 经验分享列表
        /// </summary>
        /// <param name="tenantId"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        [AbpAllowAnonymous]
        public async Task<List<ArticleListDto>> GetWXPagedExpAsync(int? tenantId, int pageIndex, int pageSize)
        {
            using (CurrentUnitOfWork.SetTenantId(tenantId))
            {
                var query = _articleRepository.GetAll().Where(a => a.Type == ArticleTypeEnum.经验分享 && a.PushStatus == ArticlePushStatusEnum.已发布);
                var entity = from a in query
                             select new ArticleListDto()
                             {
                                 Id = a.Id,
                                 Title = a.Title,
                                 PushTime = a.PushTime,
                                 Content = a.Content,
                                 CoverPhoto = a.CoverPhoto
                             };
                return await entity.OrderByDescending(q => q.PushTime).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
            }
        }

        /// <summary>
        /// 根据Id获取经验分享详情
        /// </summary>
        /// <param name="id"></param>
        /// <param name="tenantId"></param>
        /// <returns></returns>
        [AbpAllowAnonymous]
        public async Task<ArticleListDto> GetWXExpByIdAsync(Guid id, int? tenantId)
        {
            using (CurrentUnitOfWork.SetTenantId(tenantId))
            {
                var result = await _articleRepository.GetAll().Where(a => a.Id == id).FirstOrDefaultAsync();
                return result.MapTo<ArticleListDto>();
            }
        }
    }
}

