using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HC.WeChat.Advises.Dtos;
using HC.WeChat.Advises;
using System;
using HC.WeChat.Dto;

namespace HC.WeChat.Advises
{
    /// <summary>
    /// Advise应用层服务的接口方法
    /// </summary>
    public interface IAdviseAppService : IApplicationService
    {
        /// <summary>
        /// 获取Advise的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<AdviseListDto>> GetPagedAdvises(GetAdvisesInput input);

        /// <summary>
        /// 通过指定id获取AdviseListDto信息
        /// </summary>
        Task<AdviseListDto> GetAdviseByIdAsync(EntityDto<Guid> input);

        /// <summary>
        /// 导出Advise为excel表
        /// </summary>
        /// <returns></returns>
        //  Task<FileDto> GetAdvisesToExcel();
        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<GetAdviseForEditOutput> GetAdviseForEdit(NullableIdDto<Guid> input);

        //todo:缺少Dto的生成GetAdviseForEditOutput
        /// <summary>
        /// 添加或者修改Advise的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateOrUpdateAdvise(CreateOrUpdateAdviseInput input);

        /// <summary>
        /// 删除Advise信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteAdvise(EntityDto<Guid> input);

        /// <summary>
        /// 批量删除Advise
        /// </summary>
        Task BatchDeleteAdvisesAsync(List<Guid> input);

        /// <summary>
        /// 已经反馈
        /// </summary>
        Task<APIResultDto> SubmitAdviseAsync(AdviseDto input);
    }
}
