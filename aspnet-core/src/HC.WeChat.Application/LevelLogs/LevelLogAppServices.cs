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
using HC.WeChat.LevelLogs.Authorization;
using HC.WeChat.LevelLogs.Dtos;
using HC.WeChat.LevelLogs.DomainServices;
using HC.WeChat.LevelLogs;
using System;

namespace HC.WeChat.LevelLogs
{
    /// <summary>
    /// LevelLog应用层服务的接口实现方法
    /// </summary>
    [AbpAuthorize(LevelLogAppPermissions.LevelLog)]
    public class LevelLogAppService : WeChatAppServiceBase, ILevelLogAppService
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<LevelLog, Guid> _levellogRepository;
        private readonly ILevelLogManager _levellogManager;

        /// <summary>
        /// 构造函数
        /// </summary>
        public LevelLogAppService(IRepository<LevelLog, Guid> levellogRepository
      , ILevelLogManager levellogManager
        )
        {
            _levellogRepository = levellogRepository;
            _levellogManager = levellogManager;
        }

        /// <summary>
        /// 获取LevelLog的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<LevelLogListDto>> GetPagedLevelLogs(GetLevelLogsInput input)
        {

            var query = _levellogRepository.GetAll();
            //TODO:根据传入的参数添加过滤条件
            var levellogCount = await query.CountAsync();

            var levellogs = await query
                .OrderBy(input.Sorting).AsNoTracking()
                .PageBy(input)
                .ToListAsync();

            //var levellogListDtos = ObjectMapper.Map<List <LevelLogListDto>>(levellogs);
            var levellogListDtos = levellogs.MapTo<List<LevelLogListDto>>();

            return new PagedResultDto<LevelLogListDto>(
                levellogCount,
                levellogListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取LevelLogListDto信息
        /// </summary>
        public async Task<LevelLogListDto> GetLevelLogByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _levellogRepository.GetAsync(input.Id);

            return entity.MapTo<LevelLogListDto>();
        }

        /// <summary>
        /// 导出LevelLog为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetLevelLogsToExcel(){
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
        public async Task<GetLevelLogForEditOutput> GetLevelLogForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetLevelLogForEditOutput();
            LevelLogEditDto levellogEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _levellogRepository.GetAsync(input.Id.Value);

                levellogEditDto = entity.MapTo<LevelLogEditDto>();

                //levellogEditDto = ObjectMapper.Map<List <levellogEditDto>>(entity);
            }
            else
            {
                levellogEditDto = new LevelLogEditDto();
            }

            output.LevelLog = levellogEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改LevelLog的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateLevelLog(CreateOrUpdateLevelLogInput input)
        {

            if (input.LevelLog.Id.HasValue)
            {
                await UpdateLevelLogAsync(input.LevelLog);
            }
            else
            {
                await CreateLevelLogAsync(input.LevelLog);
            }
        }

        /// <summary>
        /// 新增LevelLog
        /// </summary>
        [AbpAuthorize(LevelLogAppPermissions.LevelLog_CreateLevelLog)]
        protected virtual async Task<LevelLogEditDto> CreateLevelLogAsync(LevelLogEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<LevelLog>(input);

            entity = await _levellogRepository.InsertAsync(entity);
            return entity.MapTo<LevelLogEditDto>();
        }

        /// <summary>
        /// 编辑LevelLog
        /// </summary>
        [AbpAuthorize(LevelLogAppPermissions.LevelLog_EditLevelLog)]
        protected virtual async Task UpdateLevelLogAsync(LevelLogEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _levellogRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            await _levellogRepository.UpdateAsync(entity);
        }

        /// <summary>
        /// 删除LevelLog信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [AbpAuthorize(LevelLogAppPermissions.LevelLog_DeleteLevelLog)]
        public async Task DeleteLevelLog(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _levellogRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除LevelLog的方法
        /// </summary>
        [AbpAuthorize(LevelLogAppPermissions.LevelLog_BatchDeleteLevelLogs)]
        public async Task BatchDeleteLevelLogsAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _levellogRepository.DeleteAsync(s => input.Contains(s.Id));
        }

    }
}

