using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;

using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using HC.WeChat.GAGoodses.Authorization;
using HC.WeChat.GAGoodses.DomainServices;
using HC.WeChat.GAGoodses;
using HC.WeChat.GAGoodss.Dtos;

namespace HC.WeChat.GAGoodses
{
    /// <summary>
    /// GAGoods应用层服务的接口实现方法
    /// </summary>
    [AbpAuthorize(GAGoodsAppPermissions.GAGoods)]
    public class GAGoodsAppService : WeChatAppServiceBase, IGAGoodsAppService
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<GAGoods, int> _gagoodsRepository;
        private readonly IGAGoodsManager _gagoodsManager;

        /// <summary>
        /// 构造函数
        /// </summary>
        public GAGoodsAppService(IRepository<GAGoods, int> gagoodsRepository
      , IGAGoodsManager gagoodsManager
        )
        {
            _gagoodsRepository = gagoodsRepository;
            _gagoodsManager = gagoodsManager;
        }

        /// <summary>
        /// 获取GAGoods的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<GAGoodsListDto>> GetPagedGAGoodss(GetGAGoodssInput input)
        {

            var query = _gagoodsRepository.GetAll();
            //TODO:根据传入的参数添加过滤条件
            var gagoodsCount = await query.CountAsync();

            var gagoodss = await query
                .OrderBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();

            //var gagoodsListDtos = ObjectMapper.Map<List <GAGoodsListDto>>(gagoodss);
            var gagoodsListDtos = gagoodss.MapTo<List<GAGoodsListDto>>();

            return new PagedResultDto<GAGoodsListDto>(
                gagoodsCount,
                gagoodsListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取GAGoodsListDto信息
        /// </summary>
        public async Task<GAGoodsListDto> GetGAGoodsByIdAsync(EntityDto<int> input)
        {
            var entity = await _gagoodsRepository.GetAsync(input.Id);

            return entity.MapTo<GAGoodsListDto>();
        }

        /// <summary>
        /// 导出GAGoods为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetGAGoodssToExcel(){
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
        public async Task<GetGAGoodsForEditOutput> GetGAGoodsForEdit(NullableIdDto<int> input)
        {
            var output = new GetGAGoodsForEditOutput();
            GAGoodsEditDto gagoodsEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _gagoodsRepository.GetAsync(input.Id.Value);

                gagoodsEditDto = entity.MapTo<GAGoodsEditDto>();

                //gagoodsEditDto = ObjectMapper.Map<List <gagoodsEditDto>>(entity);
            }
            else
            {
                gagoodsEditDto = new GAGoodsEditDto();
            }

            output.GAGoods = gagoodsEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改GAGoods的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateGAGoods(CreateOrUpdateGAGoodsInput input)
        {

            if (input.GAGoods.Id.HasValue)
            {
                await UpdateGAGoodsAsync(input.GAGoods);
            }
            else
            {
                await CreateGAGoodsAsync(input.GAGoods);
            }
        }

        /// <summary>
        /// 新增GAGoods
        /// </summary>
        [AbpAuthorize(GAGoodsAppPermissions.GAGoods_CreateGAGoods)]
        protected virtual async Task<GAGoodsEditDto> CreateGAGoodsAsync(GAGoodsEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<GAGoods>(input);

            entity = await _gagoodsRepository.InsertAsync(entity);
            return entity.MapTo<GAGoodsEditDto>();
        }

        /// <summary>
        /// 编辑GAGoods
        /// </summary>
        [AbpAuthorize(GAGoodsAppPermissions.GAGoods_EditGAGoods)]
        protected virtual async Task UpdateGAGoodsAsync(GAGoodsEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _gagoodsRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            await _gagoodsRepository.UpdateAsync(entity);
        }

        /// <summary>
        /// 删除GAGoods信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [AbpAuthorize(GAGoodsAppPermissions.GAGoods_DeleteGAGoods)]
        public async Task DeleteGAGoods(EntityDto<int> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _gagoodsRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除GAGoods的方法
        /// </summary>
        [AbpAuthorize(GAGoodsAppPermissions.GAGoods_BatchDeleteGAGoodses)]
        public async Task BatchDeleteGAGoodssAsync(List<int> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _gagoodsRepository.DeleteAsync(s => input.Contains(s.Id));
        }

    }
}

