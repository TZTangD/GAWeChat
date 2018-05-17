using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HC.WeChat.EPCoLines.Dtos;
using HC.WeChat.EPCoLines;
using System;

namespace HC.WeChat.EPCoLines
{
    /// <summary>
    /// EPCoLine应用层服务的接口方法
    /// </summary>
    public interface IEPCoLineAppService : IApplicationService
    {
        /// <summary>
        /// 获取EPCoLine的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<EPCoLineListDto>> GetPagedEPCoLines(GetEPCoLinesInput input);

        /// <summary>
        /// 通过指定id获取EPCoLineListDto信息
        /// </summary>
        Task<EPCoLineListDto> GetEPCoLineByIdAsync(EntityDto<Guid> input);

        /// <summary>
        /// 导出EPCoLine为excel表
        /// </summary>
        /// <returns></returns>
        //  Task<FileDto> GetEPCoLinesToExcel();
        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<GetEPCoLineForEditOutput> GetEPCoLineForEdit(NullableIdDto<Guid> input);

        //todo:缺少Dto的生成GetEPCoLineForEditOutput
        /// <summary>
        /// 添加或者修改EPCoLine的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateOrUpdateEPCoLine(CreateOrUpdateEPCoLineInput input);

        /// <summary>
        /// 删除EPCoLine信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteEPCoLine(EntityDto<Guid> input);

        /// <summary>
        /// 批量删除EPCoLine
        /// </summary>
        Task BatchDeleteEPCoLinesAsync(List<Guid> input);
    }
}
