using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HC.WeChat.EPCos.Dtos;
using HC.WeChat.EPCos;
using System;

namespace HC.WeChat.EPCos
{
    /// <summary>
    /// EPCo应用层服务的接口方法
    /// </summary>
    public interface IEPCoAppService : IApplicationService
    {
        /// <summary>
        /// 获取EPCo的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<EPCoListDto>> GetPagedEPCos(GetEPCosInput input);

        /// <summary>
        /// 通过指定id获取EPCoListDto信息
        /// </summary>
        Task<EPCoListDto> GetEPCoByIdAsync(EntityDto<Guid> input);

        /// <summary>
        /// 导出EPCo为excel表
        /// </summary>
        /// <returns></returns>
        //  Task<FileDto> GetEPCosToExcel();
        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<GetEPCoForEditOutput> GetEPCoForEdit(NullableIdDto<Guid> input);

        //todo:缺少Dto的生成GetEPCoForEditOutput
        /// <summary>
        /// 添加或者修改EPCo的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateOrUpdateEPCo(CreateOrUpdateEPCoInput input);

        /// <summary>
        /// 删除EPCo信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteEPCo(EntityDto<Guid> input);

        /// <summary>
        /// 批量删除EPCo
        /// </summary>
        Task BatchDeleteEPCosAsync(List<Guid> input);
    }
}
