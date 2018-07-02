using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using System.Linq;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;

using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using HC.WeChat.ExhibitionShops.Authorization;
using HC.WeChat.ExhibitionShops.DomainServices;
using HC.WeChat.ExhibitionShops.Dtos;
using HC.WeChat.ExhibitionShops;
using System;

namespace HC.WeChat.ExhibitionShops
{
    /// <summary>
    /// ExhibitionShop应用层服务的接口实现方法
    /// </summary>
    [AbpAuthorize(ExhibitionShopAppPermissions.ExhibitionShop)]
    public class ExhibitionShopAppService : WeChatAppServiceBase, IExhibitionShopAppService
    {
        private readonly IRepository<ExhibitionShop, Guid> _exhibitionshopRepository;
        private readonly IExhibitionShopManager _exhibitionshopManager;

        /// <summary>
        /// 构造函数
        /// </summary>
        public ExhibitionShopAppService(
            IRepository<ExhibitionShop, Guid> exhibitionshopRepository
      , IExhibitionShopManager exhibitionshopManager
        )
        {
            _exhibitionshopRepository = exhibitionshopRepository;
            _exhibitionshopManager = exhibitionshopManager;
        }


        /// <summary>
        /// 获取ExhibitionShop的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<ExhibitionShopListDto>> GetPagedExhibitionShops(GetExhibitionShopsInput input)
        {

            var query = _exhibitionshopRepository.GetAll();
            //TODO:根据传入的参数添加过滤条件

            var exhibitionshopCount = await query.CountAsync();

            var exhibitionshops = await query
                .OrderBy(input.Sorting).AsNoTracking()
                .PageBy(input)
                .ToListAsync();

            //var exhibitionshopListDtos = ObjectMapper.Map<List <ExhibitionShopListDto>>(exhibitionshops);
            var exhibitionshopListDtos = exhibitionshops.MapTo<List<ExhibitionShopListDto>>();

            return new PagedResultDto<ExhibitionShopListDto>(
                exhibitionshopCount,
                exhibitionshopListDtos
                );






        }

        /// <summary>
        /// 通过指定id获取ExhibitionShopListDto信息
        /// </summary>
        public async Task<ExhibitionShopListDto> GetExhibitionShopByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _exhibitionshopRepository.GetAsync(input.Id);

            return entity.MapTo<ExhibitionShopListDto>();
        }






        /// <summary>
        /// 导出ExhibitionShop为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetExhibitionShopsToExcel(){

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
        public async Task<GetExhibitionShopForEditOutput> GetExhibitionShopForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetExhibitionShopForEditOutput();
            ExhibitionShopEditDto exhibitionshopEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _exhibitionshopRepository.GetAsync(input.Id.Value);

                exhibitionshopEditDto = entity.MapTo<ExhibitionShopEditDto>();

                //exhibitionshopEditDto = ObjectMapper.Map<List <exhibitionshopEditDto>>(entity);


            }
            else
            {
                exhibitionshopEditDto = new ExhibitionShopEditDto();
            }

            output.ExhibitionShop = exhibitionshopEditDto;
            return output;

        }


        /// <summary>
        /// 添加或者修改ExhibitionShop的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateExhibitionShop(CreateOrUpdateExhibitionShopInput input)
        {

            if (input.ExhibitionShop.Id.HasValue)
            {
                await UpdateExhibitionShopAsync(input.ExhibitionShop);
            }
            else
            {
                await CreateExhibitionShopAsync(input.ExhibitionShop);
            }
        }

        /// <summary>
        /// 新增ExhibitionShop
        /// </summary>
        [AbpAuthorize(ExhibitionShopAppPermissions.ExhibitionShop_CreateExhibitionShop)]
        protected virtual async Task<ExhibitionShopEditDto> CreateExhibitionShopAsync(ExhibitionShopEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增

            var entity = ObjectMapper.Map<ExhibitionShop>(input);

            entity = await _exhibitionshopRepository.InsertAsync(entity);
            return entity.MapTo<ExhibitionShopEditDto>();
        }

        /// <summary>
        /// 编辑ExhibitionShop
        /// </summary>
        [AbpAuthorize(ExhibitionShopAppPermissions.ExhibitionShop_EditExhibitionShop)]
        protected virtual async Task UpdateExhibitionShopAsync(ExhibitionShopEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新

            var entity = await _exhibitionshopRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            await _exhibitionshopRepository.UpdateAsync(entity);
        }




        /// <summary>
        /// 删除ExhibitionShop信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [AbpAuthorize(ExhibitionShopAppPermissions.ExhibitionShop_DeleteExhibitionShop)]
        public async Task DeleteExhibitionShop(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _exhibitionshopRepository.DeleteAsync(input.Id);
        }



        /// <summary>
        /// 批量删除ExhibitionShop的方法
        /// </summary>
        [AbpAuthorize(ExhibitionShopAppPermissions.ExhibitionShop_BatchDeleteExhibitionShops)]
        public async Task BatchDeleteExhibitionShopsAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _exhibitionshopRepository.DeleteAsync(s => input.Contains(s.Id));
        }

    }
}


