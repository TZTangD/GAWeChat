using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HC.WeChat.LevelLogs.Dtos;
using HC.WeChat.LevelLogs;
using System;

namespace HC.WeChat.LevelLogs
{
    /// <summary>
    /// LevelLog应用层服务的接口方法
    /// </summary>
    public interface ILevelLogAppService : IApplicationService
    {
        /// <summary>
        /// 获取LevelLog的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<LevelLogListDto>> GetPagedLevelLogs(GetLevelLogsInput input);

        /// <summary>
        /// 通过指定id获取LevelLogListDto信息
        /// </summary>
        Task<LevelLogListDto> GetLevelLogByIdAsync(EntityDto<Guid> input);

        /// <summary>
        /// 导出LevelLog为excel表
        /// </summary>
        /// <returns></returns>
        //  Task<FileDto> GetLevelLogsToExcel();
        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<GetLevelLogForEditOutput> GetLevelLogForEdit(NullableIdDto<Guid> input);

        //todo:缺少Dto的生成GetLevelLogForEditOutput
        /// <summary>
        /// 添加或者修改LevelLog的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateOrUpdateLevelLog(CreateOrUpdateLevelLogInput input);

        /// <summary>
        /// 删除LevelLog信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteLevelLog(EntityDto<Guid> input);

        /// <summary>
        /// 批量删除LevelLog
        /// </summary>
        Task BatchDeleteLevelLogsAsync(List<Guid> input);

        /// <summary>
        /// 上月是否更新档级
        /// </summary>
        /// <returns></returns>
        Task<bool> IsUpdateLevel();

        /// <summary>
        /// 新增档级更新日志
        /// </summary>
        /// <returns></returns>
        Task<LevelLogEditDto> CreateSingleLevelLogAsync();

    }
}
