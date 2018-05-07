using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HC.WeChat.Activities.Dtos;
using HC.WeChat.Activities;
using System;

namespace HC.WeChat.Activities
{
    /// <summary>
    /// Activity应用层服务的接口方法
    /// </summary>
    public interface IActivityAppService : IApplicationService
    {
        /// <summary>
        /// 获取Activity的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<ActivityListDto>> GetPagedActivities(GetActivitysInput input);

        /// <summary>
        /// 通过指定id获取ActivityListDto信息
        /// </summary>
        Task<ActivityListDto> GetActivityByIdAsync(EntityDto<Guid> input);

        /// <summary>
        /// 导出Activity为excel表
        /// </summary>
        /// <returns></returns>
        //  Task<FileDto> GetActivitysToExcel();
        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<GetActivityForEditOutput> GetActivityForEdit(NullableIdDto<Guid> input);

        //todo:缺少Dto的生成GetActivityForEditOutput
        /// <summary>
        /// 添加或者修改Activity的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateOrUpdateActivity(CreateOrUpdateActivityInput input);

        /// <summary>
        /// 删除Activity信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteActivity(EntityDto<Guid> input);

        /// <summary>
        /// 批量删除Activity
        /// </summary>
        Task BatchDeleteActivitiesAsync(List<Guid> input);

        /// <summary>
        /// 通过租户id获取活动信息
        /// </summary>
        /// <returns></returns>
        Task<ActivityListDto> GetActivityByIdDtoAsync(EntityDto<Guid> input);

        /// <summary>
        /// 添加或者修改Activity的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<ActivityEditDto> CreateOrUpdateActivityDto(ActivityEditDto input);

        /// <summary>
        /// 联动删除商品信息
        /// </summary>
        /// <param name="input">活动id</param>
        /// <returns></returns>
        Task DeleteActivitiesAsyncDtos(EntityDto<Guid> input);

        /// <summary>
        /// 发布是否可用
        /// </summary>
        /// <returns></returns>
        bool IsPulish();
        /// 通过租户ID获取微信活动
        /// </summary>
        Task<ActivityListDto> GetTenantWeChatActivityAsync(int? tenantId);
    }
}
