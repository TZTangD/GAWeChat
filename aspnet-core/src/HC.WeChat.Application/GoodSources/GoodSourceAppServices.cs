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
using HC.WeChat.GoodSources.Authorization;
using HC.WeChat.GoodSources.Dtos;
using HC.WeChat.GoodSources.DomainServices;
using HC.WeChat.GoodSources;
using System;
using HC.WeChat.Products;

namespace HC.WeChat.GoodSources
{
    /// <summary>
    /// GoodSource应用层服务的接口实现方法
    /// </summary>
    [AbpAuthorize(GoodSourceAppPermissions.GoodSource)]
    public class GoodSourceAppService : WeChatAppServiceBase, IGoodSourceAppService
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<GoodSource, Guid> _goodsourceRepository;
        private readonly IGoodSourceManager _goodsourceManager;
        private readonly IRepository<Product, Guid> _productRepository;

        /// <summary>
        /// 构造函数
        /// </summary>
        public GoodSourceAppService(IRepository<GoodSource, Guid> goodsourceRepository
      , IGoodSourceManager goodsourceManager, IRepository<Product, Guid> productRepository
        )
        {
            _goodsourceRepository = goodsourceRepository;
            _goodsourceManager = goodsourceManager;
            _productRepository = productRepository;
        }

        /// <summary>
        /// 获取GoodSource的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<GoodSourceListDto>> GetPagedGoodSources(GetGoodSourcesInput input)
        {

            var query = _goodsourceRepository.GetAll();
            //TODO:根据传入的参数添加过滤条件
            var goodsourceCount = await query.CountAsync();

            var goodsources = await query
                .OrderBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();

            //var goodsourceListDtos = ObjectMapper.Map<List <GoodSourceListDto>>(goodsources);
            var goodsourceListDtos = goodsources.MapTo<List<GoodSourceListDto>>();

            return new PagedResultDto<GoodSourceListDto>(
                goodsourceCount,
                goodsourceListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取GoodSourceListDto信息
        /// </summary>
        public async Task<GoodSourceListDto> GetGoodSourceByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _goodsourceRepository.GetAsync(input.Id);

            return entity.MapTo<GoodSourceListDto>();
        }

        /// <summary>
        /// 导出GoodSource为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetGoodSourcesToExcel(){
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
        public async Task<GetGoodSourceForEditOutput> GetGoodSourceForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetGoodSourceForEditOutput();
            GoodSourceEditDto goodsourceEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _goodsourceRepository.GetAsync(input.Id.Value);

                goodsourceEditDto = entity.MapTo<GoodSourceEditDto>();

                //goodsourceEditDto = ObjectMapper.Map<List <goodsourceEditDto>>(entity);
            }
            else
            {
                goodsourceEditDto = new GoodSourceEditDto();
            }

            output.GoodSource = goodsourceEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改GoodSource的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateGoodSource(CreateOrUpdateGoodSourceInput input)
        {

            if (input.GoodSource.Id.HasValue)
            {
                await UpdateGoodSourceAsync(input.GoodSource);
            }
            else
            {
                await CreateGoodSourceAsync(input.GoodSource);
            }
        }

        /// <summary>
        /// 新增GoodSource
        /// </summary>
        [AbpAuthorize(GoodSourceAppPermissions.GoodSource_CreateGoodSource)]
        protected virtual async Task<GoodSourceEditDto> CreateGoodSourceAsync(GoodSourceEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<GoodSource>(input);

            entity = await _goodsourceRepository.InsertAsync(entity);
            return entity.MapTo<GoodSourceEditDto>();
        }

        /// <summary>
        /// 编辑GoodSource
        /// </summary>
        [AbpAuthorize(GoodSourceAppPermissions.GoodSource_EditGoodSource)]
        protected virtual async Task UpdateGoodSourceAsync(GoodSourceEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _goodsourceRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            await _goodsourceRepository.UpdateAsync(entity);
        }

        /// <summary>
        /// 删除GoodSource信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [AbpAuthorize(GoodSourceAppPermissions.GoodSource_DeleteGoodSource)]
        public async Task DeleteGoodSource(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _goodsourceRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除GoodSource的方法
        /// </summary>
        [AbpAuthorize(GoodSourceAppPermissions.GoodSource_BatchDeleteGoodSources)]
        public async Task BatchDeleteGoodSourcesAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _goodsourceRepository.DeleteAsync(s => input.Contains(s.Id));
        }

        /// <summary>
        /// 获取指定零售户
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [AbpAllowAnonymous]
        public async Task<List<GoodSourceListForWeChatDto>> GetPagedGoodSourcesForWeChatAsync(GetGoodSourcesInput input)
        {
            using (CurrentUnitOfWork.SetTenantId(input.tenantId))
            {
                var goodSource = _goodsourceRepository.GetAll().Where(g => g.custCode == input.CustCode).OrderBy(g => g.goodCode).Skip(input.SkipCount).Take(input.MaxResultCount);
                var puduct = _productRepository.GetAll();
                var result = await (from g in goodSource
                                    join p in puduct on g.goodCode equals p.ItemId
                                    select new GoodSourceListForWeChatDto
                                    {
                                        Id = g.Id,
                                        CustCode = input.CustCode,
                                        ItemId = g.custCode,
                                        ItemName = p.Specification,
                                        Amount = g.amount
                                    }).ToListAsync();

                return result;
            }
        }

    }
}

