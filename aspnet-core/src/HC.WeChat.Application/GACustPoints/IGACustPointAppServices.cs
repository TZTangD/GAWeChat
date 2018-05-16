using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HC.WeChat.GACustPoints.Dtos;
using HC.WeChat.GACustPoints;

namespace HC.WeChat.GACustPoints
{
    /// <summary>
    /// GACustPoint应用层服务的接口方法
    /// </summary>
    public interface IGACustPointAppService : IApplicationService
    {
        /// <summary>
        /// 获取GACustPoint的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<GACustPointListDto>> GetPagedGACustPoints(GetGACustPointsInput input);

        /// <summary>
        /// 通过指定id获取GACustPointListDto信息
        /// </summary>
        Task<GACustPointListDto> GetGACustPointByIdAsync(EntityDto<int> input);

        /// <summary>
        /// 导出GACustPoint为excel表
        /// </summary>
        /// <returns></returns>
        //  Task<FileDto> GetGACustPointsToExcel();
        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<GetGACustPointForEditOutput> GetGACustPointForEdit(NullableIdDto<int> input);

        //todo:缺少Dto的生成GetGACustPointForEditOutput
        /// <summary>
        /// 添加或者修改GACustPoint的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateOrUpdateGACustPoint(CreateOrUpdateGACustPointInput input);

        /// <summary>
        /// 删除GACustPoint信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteGACustPoint(EntityDto<int> input);

        /// <summary>
        /// 批量删除GACustPoint
        /// </summary>
        Task BatchDeleteGACustPointsAsync(List<int> input);
    }
}
