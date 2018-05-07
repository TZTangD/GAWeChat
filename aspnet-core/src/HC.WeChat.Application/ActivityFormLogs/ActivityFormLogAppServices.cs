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
using HC.WeChat.ActivityFormLogs.Authorization;
using HC.WeChat.ActivityFormLogs.Dtos;
using HC.WeChat.ActivityFormLogs.DomainServices;
using HC.WeChat.ActivityFormLogs;
using System;
using HC.WeChat.Authorization;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.ActivityFormLogs
{
    /// <summary>
    /// ActivityFormLog应用层服务的接口实现方法
    /// </summary>
    //[AbpAuthorize(ActivityFormLogAppPermissions.ActivityFormLog)]
    [AbpAuthorize(AppPermissions.Pages)]
    public class ActivityFormLogAppService : WeChatAppServiceBase, IActivityFormLogAppService
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<ActivityFormLog, Guid> _activityformlogRepository;
        private readonly IActivityFormLogManager _activityformlogManager;

        /// <summary>
        /// 构造函数
        /// </summary>
        public ActivityFormLogAppService(IRepository<ActivityFormLog, Guid> activityformlogRepository
      , IActivityFormLogManager activityformlogManager
        )
        {
            _activityformlogRepository = activityformlogRepository;
            _activityformlogManager = activityformlogManager;
        }

        /// <summary>
        /// 获取ActivityFormLog的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<ActivityFormLogListDto>> GetPagedActivityFormLogs(GetActivityFormLogsInput input)
        {

            var query = _activityformlogRepository.GetAll();
            //TODO:根据传入的参数添加过滤条件
            var activityformlogCount = await query.CountAsync();

            var activityformlogs = await query
                .OrderBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();

            //var activityformlogListDtos = ObjectMapper.Map<List <ActivityFormLogListDto>>(activityformlogs);
            var activityformlogListDtos = activityformlogs.MapTo<List<ActivityFormLogListDto>>();

            return new PagedResultDto<ActivityFormLogListDto>(
                activityformlogCount,
                activityformlogListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取ActivityFormLogListDto信息
        /// </summary>
        public async Task<ActivityFormLogListDto> GetActivityFormLogByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _activityformlogRepository.GetAsync(input.Id);

            return entity.MapTo<ActivityFormLogListDto>();
        }

        /// <summary>
        /// 导出ActivityFormLog为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetActivityFormLogsToExcel(){
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
        public async Task<GetActivityFormLogForEditOutput> GetActivityFormLogForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetActivityFormLogForEditOutput();
            ActivityFormLogEditDto activityformlogEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _activityformlogRepository.GetAsync(input.Id.Value);

                activityformlogEditDto = entity.MapTo<ActivityFormLogEditDto>();

                //activityformlogEditDto = ObjectMapper.Map<List <activityformlogEditDto>>(entity);
            }
            else
            {
                activityformlogEditDto = new ActivityFormLogEditDto();
            }

            output.ActivityFormLog = activityformlogEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改ActivityFormLog的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateActivityFormLog(CreateOrUpdateActivityFormLogInput input)
        {

            if (input.ActivityFormLog.Id.HasValue)
            {
                await UpdateActivityFormLogAsync(input.ActivityFormLog);
            }
            else
            {
                await CreateActivityFormLogAsync(input.ActivityFormLog);
            }
        }

        /// <summary>
        /// 新增ActivityFormLog
        /// </summary>
        //[AbpAuthorize(ActivityFormLogAppPermissions.ActivityFormLog_CreateActivityFormLog)]
        protected virtual async Task<ActivityFormLogEditDto> CreateActivityFormLogAsync(ActivityFormLogEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<ActivityFormLog>(input);

            entity = await _activityformlogRepository.InsertAsync(entity);
            return entity.MapTo<ActivityFormLogEditDto>();
        }

        /// <summary>
        /// 编辑ActivityFormLog
        /// </summary>
        //[AbpAuthorize(ActivityFormLogAppPermissions.ActivityFormLog_EditActivityFormLog)]
        protected virtual async Task UpdateActivityFormLogAsync(ActivityFormLogEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _activityformlogRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            await _activityformlogRepository.UpdateAsync(entity);
        }

        /// <summary>
        /// 删除ActivityFormLog信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        //[AbpAuthorize(ActivityFormLogAppPermissions.ActivityFormLog_DeleteActivityFormLog)]
        public async Task DeleteActivityFormLog(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _activityformlogRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除ActivityFormLog的方法
        /// </summary>
        //[AbpAuthorize(ActivityFormLogAppPermissions.ActivityFormLog_BatchDeleteActivityFormLogs)]
        public async Task BatchDeleteActivityFormLogsAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _activityformlogRepository.DeleteAsync(s => input.Contains(s.Id));
        }

        /// <summary>
        /// 获取活动申请日志
        /// </summary>
        /// <param name="formId">活动申请id</param>
        /// <returns></returns>
        [AbpAllowAnonymous]
        public async Task<ActivityFormLogListDto> GetActivityFormLogByFormIdAsync(Guid formId)
        {
            var entity = await _activityformlogRepository.GetAll().Where(l => l.ActivityFormId == formId && l.Status == FormStatusEnum.营销中心已审核).FirstOrDefaultAsync();
            return entity.MapTo<ActivityFormLogListDto>();
        }

    }
}

