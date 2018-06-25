using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HC.WeChat.WinningRecords.Dtos;
using HC.WeChat.WinningRecords;
using System;

namespace HC.WeChat.WinningRecords
{
    /// <summary>
    /// WinningRecord应用层服务的接口方法
    /// </summary>
    public interface IWinningRecordAppService : IApplicationService
    {
        /// <summary>
        /// 获取WinningRecord的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<WinningRecordListDto>> GetPagedWinningRecords(GetWinningRecordsInput input);

        /// <summary>
        /// 通过指定id获取WinningRecordListDto信息
        /// </summary>
        Task<WinningRecordListDto> GetWinningRecordByIdAsync(EntityDto<Guid> input);

        /// <summary>
        /// 导出WinningRecord为excel表
        /// </summary>
        /// <returns></returns>
        //  Task<FileDto> GetWinningRecordsToExcel();
        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<GetWinningRecordForEditOutput> GetWinningRecordForEdit(NullableIdDto<Guid> input);

        //todo:缺少Dto的生成GetWinningRecordForEditOutput
        /// <summary>
        /// 添加或者修改WinningRecord的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateOrUpdateWinningRecord(CreateOrUpdateWinningRecordInput input);

        /// <summary>
        /// 删除WinningRecord信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteWinningRecord(EntityDto<Guid> input);

        /// <summary>
        /// 批量删除WinningRecord
        /// </summary>
        Task BatchDeleteWinningRecordsAsync(List<Guid> input);

        /// <summary>
        /// 获取中奖记录
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<WinningRecordListDto>> GetPagedWinningRecordsOtherTable(GetWinningRecordsInput input);
    }
}
