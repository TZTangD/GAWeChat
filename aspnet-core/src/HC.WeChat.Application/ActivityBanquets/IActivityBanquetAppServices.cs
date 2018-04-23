using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HC.WeChat.ActivityBanquets.Dtos;
using HC.WeChat.ActivityBanquets;
using System;
using HC.WeChat.Dto;

namespace HC.WeChat.ActivityBanquets
{
    /// <summary>
    /// ActivityBanquet应用层服务的接口方法
    /// </summary>
    public interface IActivityBanquetAppService : IApplicationService
    {
        /// <summary>
        /// 获取ActivityBanquet的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<ActivityBanquetListDto>> GetPagedActivityBanquets(GetActivityBanquetsInput input);

        /// <summary>
        /// 通过指定id获取ActivityBanquetListDto信息
        /// </summary>
        Task<ActivityBanquetListDto> GetActivityBanquetByIdAsync(EntityDto<Guid> input);

        Task<ActivityBanquetListDto> GetActivityBanquetByFormIdAsync(EntityDto<Guid> input);

        /// <summary>
        /// 导出ActivityBanquet为excel表
        /// </summary>
        /// <returns></returns>
        //  Task<FileDto> GetActivityBanquetsToExcel();
        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<GetActivityBanquetForEditOutput> GetActivityBanquetForEdit(NullableIdDto<Guid> input);

        //todo:缺少Dto的生成GetActivityBanquetForEditOutput
        /// <summary>
        /// 添加或者修改ActivityBanquet的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateOrUpdateActivityBanquet(CreateOrUpdateActivityBanquetInput input);

        /// <summary>
        /// 删除ActivityBanquet信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteActivityBanquet(EntityDto<Guid> input);

        /// <summary>
        /// 批量删除ActivityBanquet
        /// </summary>
        Task BatchDeleteActivityBanquetsAsync(List<Guid> input);

        Task<APIResultDto> SubmitActivityBanquetWeChatAsync(ActivityBanquetWeChatDto input);

        Task<ActivityBanquetWeChatDto> GetActivityBanquetWeChatByFormIdAsync(Guid formId, int? tenantId);

        /// <summary>
        /// 根据活动申请id获取宴席信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ActivityBanquetListDto> GetActivityBanquetByFormIdWechatAsync(Guid id);

    }
}
