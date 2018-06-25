using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HC.WeChat.LuckyDraws.Dtos;
using HC.WeChat.LuckyDraws;
using System;

namespace HC.WeChat.LuckyDraws
{
    /// <summary>
    /// LuckyDraw应用层服务的接口方法
    /// </summary>
    public interface ILuckyDrawAppService : IApplicationService
    {
        /// <summary>
        /// 获取LuckyDraw的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<LuckyDrawListDto>> GetPagedLuckyDraws(GetLuckyDrawsInput input);

        /// <summary>
        /// 通过指定id获取LuckyDrawListDto信息
        /// </summary>
        Task<LuckyDrawListDto> GetLuckyDrawByIdAsync(EntityDto<Guid> input);

        /// <summary>
        /// 导出LuckyDraw为excel表
        /// </summary>
        /// <returns></returns>
        //  Task<FileDto> GetLuckyDrawsToExcel();
        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<GetLuckyDrawForEditOutput> GetLuckyDrawForEdit(NullableIdDto<Guid> input);

        //todo:缺少Dto的生成GetLuckyDrawForEditOutput
        /// <summary>
        /// 添加或者修改LuckyDraw的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateOrUpdateLuckyDraw(CreateOrUpdateLuckyDrawInput input);

        /// <summary>
        /// 删除LuckyDraw信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteLuckyDraw(EntityDto<Guid> input);

        /// <summary>
        /// 批量删除LuckyDraw
        /// </summary>
        Task BatchDeleteLuckyDrawsAsync(List<Guid> input);

        /// <summary>
        /// 新增或更新抽奖活动
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<LuckyDrawEditDto> CreateOrUpdateLuckyDrawNew(LuckyDrawEditDto input);

        /// <summary>
        /// 获取积分抽奖信息
        /// </summary>
        /// <returns></returns>
        Task<LuckyDrawListDto> GetSingleLuckyDraw();
    }
}
