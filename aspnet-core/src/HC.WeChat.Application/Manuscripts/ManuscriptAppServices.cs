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
using HC.WeChat.Manuscripts.Authorization;
using HC.WeChat.Manuscripts.Dtos;
using HC.WeChat.Manuscripts.DomainServices;
using HC.WeChat.Manuscripts;
using System;
using HC.WeChat.Authorization;
using HC.WeChat.WechatEnums;
using HC.WeChat.Dto;

namespace HC.WeChat.Manuscripts
{
    /// <summary>
    /// Manuscript应用层服务的接口实现方法
    /// </summary>
    //[AbpAuthorize(ManuscriptAppPermissions.Manuscript)]
    [AbpAuthorize(AppPermissions.Pages)]
    public class ManuscriptAppService : WeChatAppServiceBase, IManuscriptAppService
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<Manuscript, Guid> _manuscriptRepository;
        private readonly IManuscriptManager _manuscriptManager;

        /// <summary>
        /// 构造函数
        /// </summary>
        public ManuscriptAppService(IRepository<Manuscript, Guid> manuscriptRepository
      , IManuscriptManager manuscriptManager
        )
        {
            _manuscriptRepository = manuscriptRepository;
            _manuscriptManager = manuscriptManager;
        }

        /// <summary>
        /// 获取Manuscript的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<ManuscriptListDto>> GetPagedManuscripts(GetManuscriptsInput input)
        {

            var query = _manuscriptRepository.GetAll()
                .WhereIf(!string.IsNullOrEmpty(input.Title),m=>m.Title.Contains(input.Title))
                .WhereIf(!string.IsNullOrEmpty(input.Name),m=>m.UserName.Contains(input.Name))
                .WhereIf(!string.IsNullOrEmpty(input.Phone),m=>m.Phone.Contains(input.Phone))
                .WhereIf(input.Status.HasValue,m=>m.Status==input.Status);
            //TODO:根据传入的参数添加过滤条件
            var manuscriptCount = await query.CountAsync();

            var manuscripts = await query
                .OrderBy(m=>m.Status)
                .ThenByDescending(m=>m.CreationTime)
                .ThenBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();

            //var manuscriptListDtos = ObjectMapper.Map<List <ManuscriptListDto>>(manuscripts);
            var manuscriptListDtos = manuscripts.MapTo<List<ManuscriptListDto>>();

            return new PagedResultDto<ManuscriptListDto>(
                manuscriptCount,
                manuscriptListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取ManuscriptListDto信息
        /// </summary>
        public async Task<ManuscriptListDto> GetManuscriptByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _manuscriptRepository.GetAsync(input.Id);

            return entity.MapTo<ManuscriptListDto>();
        }

        /// <summary>
        /// 导出Manuscript为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetManuscriptsToExcel(){
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
        public async Task<GetManuscriptForEditOutput> GetManuscriptForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetManuscriptForEditOutput();
            ManuscriptEditDto manuscriptEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _manuscriptRepository.GetAsync(input.Id.Value);

                manuscriptEditDto = entity.MapTo<ManuscriptEditDto>();

                //manuscriptEditDto = ObjectMapper.Map<List <manuscriptEditDto>>(entity);
            }
            else
            {
                manuscriptEditDto = new ManuscriptEditDto();
            }

            output.Manuscript = manuscriptEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改Manuscript的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateManuscript(CreateOrUpdateManuscriptInput input)
        {

            if (input.Manuscript.Id.HasValue)
            {
                await UpdateManuscriptAsync(input.Manuscript);
            }
            else
            {
                await CreateManuscriptAsync(input.Manuscript);
            }
        }

        /// <summary>
        /// 新增Manuscript
        /// </summary>
        //[AbpAuthorize(ManuscriptAppPermissions.Manuscript_CreateManuscript)]
        protected virtual async Task<ManuscriptEditDto> CreateManuscriptAsync(ManuscriptEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<Manuscript>(input);

            entity = await _manuscriptRepository.InsertAsync(entity);
            return entity.MapTo<ManuscriptEditDto>();
        }

        /// <summary>
        /// 编辑Manuscript
        /// </summary>
        //[AbpAuthorize(ManuscriptAppPermissions.Manuscript_EditManuscript)]
        protected virtual async Task<ManuscriptEditDto> UpdateManuscriptAsync(ManuscriptEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _manuscriptRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            var result = await _manuscriptRepository.UpdateAsync(entity);
            return result.MapTo<ManuscriptEditDto>();
        }

        /// <summary>
        /// 删除Manuscript信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        //[AbpAuthorize(ManuscriptAppPermissions.Manuscript_DeleteManuscript)]
        public async Task DeleteManuscript(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _manuscriptRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除Manuscript的方法
        /// </summary>
        //[AbpAuthorize(ManuscriptAppPermissions.Manuscript_BatchDeleteManuscripts)]
        public async Task BatchDeleteManuscriptsAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _manuscriptRepository.DeleteAsync(s => input.Contains(s.Id));
        }

        /// <summary>
        /// 添加或者修改Manuscript的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<ManuscriptEditDto> CreateOrUpdateManuscriptDto(ManuscriptEditDto input)
        {

            if (input.Id.HasValue)
            {
               return await UpdateManuscriptAsync(input);
            }
            else
            {
               return await CreateManuscriptAsync(input);
            }
        }

        /// <summary>
        /// 微信投稿
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [AbpAllowAnonymous]
        public async Task<APIResultDto> CreatWXManuscript(ManuscriptEditDto input)
        {
            //新增评价
            var result = input.MapTo<Manuscript>();
            result.CreationTime = DateTime.Now;
            result.Status = ProcessTypeEnum.未处理;
            result.OpenId = input.OpenId;
            result.Phone = input.Phone;
            result.Type = ArticleTypeEnum.经验分享;
            result.UserName = input.UserName;
            result.Content = input.Content;
            await _manuscriptRepository.InsertAsync(result);        
            return new APIResultDto() { Code = 0, Msg = "投稿成功，请等待后台审核" };
        }

    }
}

