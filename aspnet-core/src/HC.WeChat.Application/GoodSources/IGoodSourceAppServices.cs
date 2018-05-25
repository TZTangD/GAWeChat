using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HC.WeChat.GoodSources.Dtos;
using HC.WeChat.GoodSources;
using System;

namespace HC.WeChat.GoodSources
{
    /// <summary>
    /// GoodSource应用层服务的接口方法
    /// </summary>
    public interface IGoodSourceAppService : IApplicationService
    {
        /// <summary>
        /// 获取GoodSource的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<GoodSourceListDto>> GetPagedGoodSources(GetGoodSourcesInput input);

        /// <summary>
        /// 通过指定id获取GoodSourceListDto信息
        /// </summary>
        Task<GoodSourceListDto> GetGoodSourceByIdAsync(EntityDto<Guid> input);

        /// <summary>
        /// 导出GoodSource为excel表
        /// </summary>
        /// <returns></returns>
        //  Task<FileDto> GetGoodSourcesToExcel();
        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<GetGoodSourceForEditOutput> GetGoodSourceForEdit(NullableIdDto<Guid> input);

        //todo:缺少Dto的生成GetGoodSourceForEditOutput
        /// <summary>
        /// 添加或者修改GoodSource的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateOrUpdateGoodSource(CreateOrUpdateGoodSourceInput input);

        /// <summary>
        /// 删除GoodSource信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteGoodSource(EntityDto<Guid> input);

        /// <summary>
        /// 批量删除GoodSource
        /// </summary>
        Task BatchDeleteGoodSourcesAsync(List<Guid> input);

        /// <summary>
        /// 获取指定零售户
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<List<GoodSourceListForWeChatDto>> GetPagedGoodSourcesForWeChatAsync(GetGoodSourcesInput input);
    }
}
