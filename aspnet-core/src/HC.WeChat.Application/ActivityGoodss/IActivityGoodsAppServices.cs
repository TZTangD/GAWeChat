using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HC.WeChat.ActivityGoodses.Dtos;
using HC.WeChat.ActivityGoodses;
using System;

namespace HC.WeChat.ActivityGoodses
{
    /// <summary>
    /// ActivityGoods应用层服务的接口方法
    /// </summary>
    public interface IActivityGoodsAppService : IApplicationService
    {
        /// <summary>
        /// 获取ActivityGoods的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<ActivityGoodsListDto>> GetPagedActivityGoodses(GetActivityGoodsesInput input);

        /// <summary>
        /// 通过指定id获取ActivityGoodsListDto信息
        /// </summary>
        Task<ActivityGoodsListDto> GetActivityGoodsByIdAsync(EntityDto<Guid> input);

        /// <summary>
        /// 导出ActivityGoods为excel表
        /// </summary>
        /// <returns></returns>
        //  Task<FileDto> GetActivityGoodssToExcel();
        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<GetActivityGoodsForEditOutput> GetActivityGoodsForEdit(NullableIdDto<Guid> input);

        //todo:缺少Dto的生成GetActivityGoodsForEditOutput
        /// <summary>
        /// 添加或者修改ActivityGoods的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateOrUpdateActivityGoods(CreateOrUpdateActivityGoodsInput input);

        /// <summary>
        /// 删除ActivityGoods信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteActivityGoods(EntityDto<Guid> input);

        /// <summary>
        /// 批量删除ActivityGoods
        /// </summary>
        Task BatchDeleteActivityGoodsesAsync(List<Guid> input);

        /// <summary>
        /// 添加或者修改ActivityGoods的方法
        /// </summary>
        /// <param name="input">活动商品实体</param>
        /// <returns></returns>
        Task<ActivityGoodsEditDto> CreateOrUpdateActivityGoodsDto(ActivityGoodsEditDto input);

        /// <summary>
        /// 根据活动id获取ActivityGoods的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<ActivityGoodsListDto>> GetPagedActivityGoodsesByAcId(GetActivityGoodsesInput input);

        Task<List<ActivityGoodsDto>> GetActivityGoodsByActivityId(Guid activityId);
    }
}
