using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HC.WeChat.StatisticalDetails.Dtos;
using HC.WeChat.StatisticalDetails;
using System;

namespace HC.WeChat.StatisticalDetails
{
    /// <summary>
    /// StatisticalDetail应用层服务的接口方法
    /// </summary>
    public interface IStatisticalDetailAppService : IApplicationService
    {
        /// <summary>
        /// 获取StatisticalDetail的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<StatisticalDetailListDto>> GetPagedStatisticalDetails(GetStatisticalDetailsInput input);

        /// <summary>
        /// 通过指定id获取StatisticalDetailListDto信息
        /// </summary>
        Task<StatisticalDetailListDto> GetStatisticalDetailByIdAsync(EntityDto<Guid> input);

        /// <summary>
        /// 导出StatisticalDetail为excel表
        /// </summary>
        /// <returns></returns>
        //  Task<FileDto> GetStatisticalDetailsToExcel();
        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<GetStatisticalDetailForEditOutput> GetStatisticalDetailForEdit(NullableIdDto<Guid> input);

        //todo:缺少Dto的生成GetStatisticalDetailForEditOutput
        /// <summary>
        /// 添加或者修改StatisticalDetail的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateOrUpdateStatisticalDetail(CreateOrUpdateStatisticalDetailInput input);

        /// <summary>
        /// 删除StatisticalDetail信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteStatisticalDetail(EntityDto<Guid> input);

        /// <summary>
        /// 批量删除StatisticalDetail
        /// </summary>
        Task BatchDeleteStatisticalDetailsAsync(List<Guid> input);
    }
}
