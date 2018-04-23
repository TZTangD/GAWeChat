using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HC.WeChat.ActivityFormLogs.Dtos;
using HC.WeChat.ActivityFormLogs;
using System;

namespace HC.WeChat.ActivityFormLogs
{
    /// <summary>
    /// ActivityFormLog应用层服务的接口方法
    /// </summary>
    public interface IActivityFormLogAppService : IApplicationService
    {
        /// <summary>
        /// 获取ActivityFormLog的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<ActivityFormLogListDto>> GetPagedActivityFormLogs(GetActivityFormLogsInput input);

        /// <summary>
        /// 通过指定id获取ActivityFormLogListDto信息
        /// </summary>
        Task<ActivityFormLogListDto> GetActivityFormLogByIdAsync(EntityDto<Guid> input);

        /// <summary>
        /// 导出ActivityFormLog为excel表
        /// </summary>
        /// <returns></returns>
        //  Task<FileDto> GetActivityFormLogsToExcel();
        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<GetActivityFormLogForEditOutput> GetActivityFormLogForEdit(NullableIdDto<Guid> input);

        //todo:缺少Dto的生成GetActivityFormLogForEditOutput
        /// <summary>
        /// 添加或者修改ActivityFormLog的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateOrUpdateActivityFormLog(CreateOrUpdateActivityFormLogInput input);

        /// <summary>
        /// 删除ActivityFormLog信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteActivityFormLog(EntityDto<Guid> input);

        /// <summary>
        /// 批量删除ActivityFormLog
        /// </summary>
        Task BatchDeleteActivityFormLogsAsync(List<Guid> input);

        /// <summary>
        /// 获取活动申请日志
        /// </summary>
        /// <param name="formId">活动申请id</param>
        /// <returns></returns>
        Task<ActivityFormLogListDto> GetActivityFormLogByFormIdAsync(Guid formId);
    }
}
