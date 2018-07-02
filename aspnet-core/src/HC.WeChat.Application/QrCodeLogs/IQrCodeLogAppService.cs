using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HC.WeChat.QrCodeLogs.Dtos;
using HC.WeChat.QrCodeLogs;
using System;

namespace HC.WeChat.QrCodeLogs
{
    /// <summary>
    /// QrCodeLog应用层服务的接口方法
    /// </summary>
    public interface IQrCodeLogAppService : IApplicationService
    {
        /// <summary>
        /// 获取QrCodeLog的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<QrCodeLogListDto>> GetPagedQrCodeLogs(GetQrCodeLogsInput input);

            /// <summary>
            /// 通过指定id获取QrCodeLogListDto信息
            /// </summary>
            Task<QrCodeLogListDto> GetQrCodeLogByIdAsync(EntityDto<Guid> input);


        /// <summary>
        /// 导出QrCodeLog为excel表
        /// </summary>
        /// <returns></returns>
		//Task<FileDto> GetQrCodeLogsToExcel();

        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<GetQrCodeLogForEditOutput> GetQrCodeLogForEdit(NullableIdDto<Guid> input);

        //todo:缺少Dto的生成GetQrCodeLogForEditOutput

        /// <summary>
        /// 添加或者修改QrCodeLog的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateOrUpdateQrCodeLog(CreateOrUpdateQrCodeLogInput input);

        /// <summary>
        /// 删除QrCodeLog信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteQrCodeLog(EntityDto<Guid> input);

            /// <summary>
            /// 批量删除QrCodeLog
            /// </summary>
        Task BatchDeleteQrCodeLogsAsync(List<Guid> input);
    }
}
