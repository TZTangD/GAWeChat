using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HC.WeChat.Manuscripts.Dtos;
using HC.WeChat.Manuscripts;
using System;

namespace HC.WeChat.Manuscripts
{
    /// <summary>
    /// Manuscript应用层服务的接口方法
    /// </summary>
    public interface IManuscriptAppService : IApplicationService
    {
        /// <summary>
        /// 获取Manuscript的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<ManuscriptListDto>> GetPagedManuscripts(GetManuscriptsInput input);

        /// <summary>
        /// 通过指定id获取ManuscriptListDto信息
        /// </summary>
        Task<ManuscriptListDto> GetManuscriptByIdAsync(EntityDto<Guid> input);

        /// <summary>
        /// 导出Manuscript为excel表
        /// </summary>
        /// <returns></returns>
        //  Task<FileDto> GetManuscriptsToExcel();
        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<GetManuscriptForEditOutput> GetManuscriptForEdit(NullableIdDto<Guid> input);

        //todo:缺少Dto的生成GetManuscriptForEditOutput
        /// <summary>
        /// 添加或者修改Manuscript的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateOrUpdateManuscript(CreateOrUpdateManuscriptInput input);

        /// <summary>
        /// 删除Manuscript信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteManuscript(EntityDto<Guid> input);

        /// <summary>
        /// 批量删除Manuscript
        /// </summary>
        Task BatchDeleteManuscriptsAsync(List<Guid> input);

        /// <summary>
        /// 添加或者修改Manuscript的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<ManuscriptEditDto> CreateOrUpdateManuscriptDto(ManuscriptEditDto input);
    }
}
