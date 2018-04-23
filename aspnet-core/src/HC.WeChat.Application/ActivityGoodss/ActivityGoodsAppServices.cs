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
using HC.WeChat.ActivityGoodses.Authorization;
using HC.WeChat.ActivityGoodses.Dtos;
using HC.WeChat.ActivityGoodses.DomainServices;
using HC.WeChat.ActivityGoodses;
using System;
using HC.WeChat.Authorization;

namespace HC.WeChat.ActivityGoodses
{
    /// <summary>
    /// ActivityGoods应用层服务的接口实现方法
    /// </summary>
    //[AbpAuthorize(ActivityGoodsAppPermissions.ActivityGoods)]
    [AbpAuthorize(AppPermissions.Pages)]
    public class ActivityGoodsAppService : WeChatAppServiceBase, IActivityGoodsAppService
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<ActivityGoods, Guid> _activitygoodsRepository;
        private readonly IActivityGoodsManager _activitygoodsManager;

        /// <summary>
        /// 构造函数
        /// </summary>
        public ActivityGoodsAppService(IRepository<ActivityGoods, Guid> activitygoodsRepository
      , IActivityGoodsManager activitygoodsManager
        )
        {
            _activitygoodsRepository = activitygoodsRepository;
            _activitygoodsManager = activitygoodsManager;
        }

        /// <summary>
        /// 获取ActivityGoods的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<ActivityGoodsListDto>> GetPagedActivityGoodses(GetActivityGoodsesInput input)
        {

            var query = _activitygoodsRepository.GetAll();
            //TODO:根据传入的参数添加过滤条件
            var activitygoodsCount = await query.CountAsync();

            var activitygoodss = await query
                .OrderBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();

            //var activitygoodsListDtos = ObjectMapper.Map<List <ActivityGoodsListDto>>(activitygoodss);
            var activitygoodsListDtos = activitygoodss.MapTo<List<ActivityGoodsListDto>>();

            return new PagedResultDto<ActivityGoodsListDto>(
                activitygoodsCount,
                activitygoodsListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取ActivityGoodsListDto信息
        /// </summary>
        public async Task<ActivityGoodsListDto> GetActivityGoodsByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _activitygoodsRepository.GetAsync(input.Id);

            return entity.MapTo<ActivityGoodsListDto>();
        }

        /// <summary>
        /// 导出ActivityGoods为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetActivityGoodssToExcel(){
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
        public async Task<GetActivityGoodsForEditOutput> GetActivityGoodsForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetActivityGoodsForEditOutput();
            ActivityGoodsEditDto activitygoodsEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _activitygoodsRepository.GetAsync(input.Id.Value);

                activitygoodsEditDto = entity.MapTo<ActivityGoodsEditDto>();

                //activitygoodsEditDto = ObjectMapper.Map<List <activitygoodsEditDto>>(entity);
            }
            else
            {
                activitygoodsEditDto = new ActivityGoodsEditDto();
            }

            output.ActivityGoods = activitygoodsEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改ActivityGoods的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateActivityGoods(CreateOrUpdateActivityGoodsInput input)
        {

            if (input.ActivityGoods.Id.HasValue)
            {
                await UpdateActivityGoodsAsync(input.ActivityGoods);
            }
            else
            {
                await CreateActivityGoodsAsync(input.ActivityGoods);
            }
        }

        /// <summary>
        /// 新增ActivityGoods
        /// </summary>
        //[AbpAuthorize(ActivityGoodsAppPermissions.ActivityGoods_CreateActivityGoods)]
        protected virtual async Task<ActivityGoodsEditDto> CreateActivityGoodsAsync(ActivityGoodsEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<ActivityGoods>(input);

            entity = await _activitygoodsRepository.InsertAsync(entity);
            return entity.MapTo<ActivityGoodsEditDto>();
        }

        /// <summary>
        /// 编辑ActivityGoods
        /// </summary>
        //[AbpAuthorize(ActivityGoodsAppPermissions.ActivityGoods_EditActivityGoods)]
        protected virtual async Task UpdateActivityGoodsAsync(ActivityGoodsEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _activitygoodsRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            await _activitygoodsRepository.UpdateAsync(entity);
        }

        /// <summary>
        /// 删除ActivityGoods信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        //[AbpAuthorize(ActivityGoodsAppPermissions.ActivityGoods_DeleteActivityGoods)]
        public async Task DeleteActivityGoods(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _activitygoodsRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除ActivityGoods的方法
        /// </summary>
        //[AbpAuthorize(ActivityGoodsAppPermissions.ActivityGoods_BatchDeleteActivityGoodses)]
        public async Task BatchDeleteActivityGoodsesAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _activitygoodsRepository.DeleteAsync(s => input.Contains(s.Id));
        }

        /// <summary>
        /// 添加或者修改ActivityGoods的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<ActivityGoodsEditDto> CreateOrUpdateActivityGoodsDto(ActivityGoodsEditDto input)
        {
            if (input.Id.HasValue)
            {
                 return await UpdateActivityGoodsAsyncNew(input);
            }
            else
            {
                return await CreateActivityGoodsAsync(input);
            }

        }

        /// <summary>
        /// 根据活动id获取ActivityGoods的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<ActivityGoodsListDto>> GetPagedActivityGoodsesByAcId(GetActivityGoodsesInput input)
        {
            if (input.AvtivityId.HasValue) {
                var query = _activitygoodsRepository.GetAll();
                //TODO:根据传入的参数添加过滤条件
                var activitygoodsCount = await query.CountAsync();

                var activitygoodss = await query
                    .Where(g => g.ActivityId == input.AvtivityId)
                    .WhereIf(!string.IsNullOrEmpty(input.SearchName),g=>g.Specification.Contains(input.SearchName))
                    .OrderBy(input.Sorting)
                    //.PageBy(input)
                    .ToListAsync();

                var activitygoodsListDtos = activitygoodss.MapTo<List<ActivityGoodsListDto>>();

                return new PagedResultDto<ActivityGoodsListDto>(
                    activitygoodsCount,
                    activitygoodsListDtos
                    );
            }
           return new PagedResultDto<ActivityGoodsListDto>();
        }
        protected virtual async Task<ActivityGoodsEditDto> UpdateActivityGoodsAsyncNew(ActivityGoodsEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _activitygoodsRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            entity = await _activitygoodsRepository.UpdateAsync(entity);
            return entity.MapTo<ActivityGoodsEditDto>();
        }

        [AbpAllowAnonymous]
        public async Task<List<ActivityGoodsDto>> GetActivityGoodsByActivityId(Guid activityId)
        {
            var goodsList = await _activitygoodsRepository.GetAll().Where(a => a.ActivityId == activityId).ToListAsync();

            return goodsList.MapTo<List<ActivityGoodsDto>>();
        }
    }
}

