using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;

using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using HC.WeChat.ActivityDeliveryInfos.Authorization;
using HC.WeChat.ActivityDeliveryInfos.Dtos;
using HC.WeChat.ActivityDeliveryInfos.DomainServices;
using HC.WeChat.ActivityDeliveryInfos;
using System;
using System.Linq;
using HC.WeChat.Authorization;

namespace HC.WeChat.ActivityDeliveryInfos
{
    /// <summary>
    /// ActivityDeliveryInfo应用层服务的接口实现方法
    /// </summary>
    //[AbpAuthorize(ActivityDeliveryInfoAppPermissions.ActivityDeliveryInfo)]
    [AbpAuthorize(AppPermissions.Pages)]
    public class ActivityDeliveryInfoAppService : WeChatAppServiceBase, IActivityDeliveryInfoAppService
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<ActivityDeliveryInfo, Guid> _activitydeliveryinfoRepository;
        private readonly IActivityDeliveryInfoManager _activitydeliveryinfoManager;

        /// <summary>
        /// 构造函数
        /// </summary>
        public ActivityDeliveryInfoAppService(IRepository<ActivityDeliveryInfo, Guid> activitydeliveryinfoRepository
      , IActivityDeliveryInfoManager activitydeliveryinfoManager
        )
        {
            _activitydeliveryinfoRepository = activitydeliveryinfoRepository;
            _activitydeliveryinfoManager = activitydeliveryinfoManager;
        }

        /// <summary>
        /// 获取ActivityDeliveryInfo的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<ActivityDeliveryInfoListDto>> GetPagedActivityDeliveryInfos(GetActivityDeliveryInfosInput input)
        {

            var query = _activitydeliveryinfoRepository.GetAll();
            //TODO:根据传入的参数添加过滤条件
            var activitydeliveryinfoCount = await query.CountAsync();

            var activitydeliveryinfos = await query
                .OrderBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();

            //var activitydeliveryinfoListDtos = ObjectMapper.Map<List <ActivityDeliveryInfoListDto>>(activitydeliveryinfos);
            var activitydeliveryinfoListDtos = activitydeliveryinfos.MapTo<List<ActivityDeliveryInfoListDto>>();

            return new PagedResultDto<ActivityDeliveryInfoListDto>(
                activitydeliveryinfoCount,
                activitydeliveryinfoListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取ActivityDeliveryInfoListDto信息
        /// </summary>
        public async Task<ActivityDeliveryInfoListDto> GetActivityDeliveryInfoByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _activitydeliveryinfoRepository.GetAsync(input.Id);

            return entity.MapTo<ActivityDeliveryInfoListDto>();
        }
        [AbpAllowAnonymous]
        public async Task<List<ActivityDeliveryInfoListDto>> GetActivityDeliveryInfoByFormIdAsync(EntityDto<Guid> input)
        {
            var entityList = await _activitydeliveryinfoRepository.GetAll().Where(a => a.ActivityFormId == input.Id).ToListAsync();

            return entityList.MapTo<List<ActivityDeliveryInfoListDto>>();
        }

        /// <summary>
        /// 导出ActivityDeliveryInfo为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetActivityDeliveryInfosToExcel(){
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
        public async Task<GetActivityDeliveryInfoForEditOutput> GetActivityDeliveryInfoForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetActivityDeliveryInfoForEditOutput();
            ActivityDeliveryInfoEditDto activitydeliveryinfoEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _activitydeliveryinfoRepository.GetAsync(input.Id.Value);

                activitydeliveryinfoEditDto = entity.MapTo<ActivityDeliveryInfoEditDto>();

                //activitydeliveryinfoEditDto = ObjectMapper.Map<List <activitydeliveryinfoEditDto>>(entity);
            }
            else
            {
                activitydeliveryinfoEditDto = new ActivityDeliveryInfoEditDto();
            }

            output.ActivityDeliveryInfo = activitydeliveryinfoEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改ActivityDeliveryInfo的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateActivityDeliveryInfo(CreateOrUpdateActivityDeliveryInfoInput input)
        {

            if (input.ActivityDeliveryInfo.Id.HasValue)
            {
                await UpdateActivityDeliveryInfoAsync(input.ActivityDeliveryInfo);
            }
            else
            {
                await CreateActivityDeliveryInfoAsync(input.ActivityDeliveryInfo);
            }
        }

        /// <summary>
        /// 新增ActivityDeliveryInfo
        /// </summary>
        //[AbpAuthorize(ActivityDeliveryInfoAppPermissions.ActivityDeliveryInfo_CreateActivityDeliveryInfo)]
        protected virtual async Task<ActivityDeliveryInfoEditDto> CreateActivityDeliveryInfoAsync(ActivityDeliveryInfoEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<ActivityDeliveryInfo>(input);

            entity = await _activitydeliveryinfoRepository.InsertAsync(entity);
            return entity.MapTo<ActivityDeliveryInfoEditDto>();
        }

        /// <summary>
        /// 编辑ActivityDeliveryInfo
        /// </summary>
        //[AbpAuthorize(ActivityDeliveryInfoAppPermissions.ActivityDeliveryInfo_EditActivityDeliveryInfo)]
        protected virtual async Task UpdateActivityDeliveryInfoAsync(ActivityDeliveryInfoEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _activitydeliveryinfoRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            await _activitydeliveryinfoRepository.UpdateAsync(entity);
        }

        /// <summary>
        /// 删除ActivityDeliveryInfo信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        //[AbpAuthorize(ActivityDeliveryInfoAppPermissions.ActivityDeliveryInfo_DeleteActivityDeliveryInfo)]
        public async Task DeleteActivityDeliveryInfo(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _activitydeliveryinfoRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除ActivityDeliveryInfo的方法
        /// </summary>
        //[AbpAuthorize(ActivityDeliveryInfoAppPermissions.ActivityDeliveryInfo_BatchDeleteActivityDeliveryInfos)]
        public async Task BatchDeleteActivityDeliveryInfosAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _activitydeliveryinfoRepository.DeleteAsync(s => input.Contains(s.Id));
        }

        /// <summary>
        /// 批量标注未邮寄为已邮寄
        /// </summary>
        /// <param name="idList">邮寄信息idList</param>
        /// <returns></returns>
        public async Task UpdateIsSend(List<Guid> idList)
        {
            foreach (var item in idList) {
                var entity = await _activitydeliveryinfoRepository.GetAsync(item);
                entity.IsSend = true;
                entity.SendTime = DateTime.Now;

                await _activitydeliveryinfoRepository.UpdateAsync(entity);
            }
        }

    }
}

