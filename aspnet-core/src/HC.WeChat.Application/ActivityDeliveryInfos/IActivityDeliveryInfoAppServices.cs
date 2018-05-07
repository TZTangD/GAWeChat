using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HC.WeChat.ActivityDeliveryInfos.Dtos;
using HC.WeChat.ActivityDeliveryInfos;
using System;

namespace HC.WeChat.ActivityDeliveryInfos
{
    /// <summary>
    /// ActivityDeliveryInfo应用层服务的接口方法
    /// </summary>
    public interface IActivityDeliveryInfoAppService : IApplicationService
    {
        /// <summary>
        /// 获取ActivityDeliveryInfo的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<ActivityDeliveryInfoListDto>> GetPagedActivityDeliveryInfos(GetActivityDeliveryInfosInput input);

        /// <summary>
        /// 通过指定id获取ActivityDeliveryInfoListDto信息
        /// </summary>
        Task<ActivityDeliveryInfoListDto> GetActivityDeliveryInfoByIdAsync(EntityDto<Guid> input);

        Task<List<ActivityDeliveryInfoListDto>> GetActivityDeliveryInfoByFormIdAsync(EntityDto<Guid> input);

        /// <summary>
        /// 导出ActivityDeliveryInfo为excel表
        /// </summary>
        /// <returns></returns>
        //  Task<FileDto> GetActivityDeliveryInfosToExcel();
        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<GetActivityDeliveryInfoForEditOutput> GetActivityDeliveryInfoForEdit(NullableIdDto<Guid> input);

        //todo:缺少Dto的生成GetActivityDeliveryInfoForEditOutput
        /// <summary>
        /// 添加或者修改ActivityDeliveryInfo的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateOrUpdateActivityDeliveryInfo(CreateOrUpdateActivityDeliveryInfoInput input);

        /// <summary>
        /// 删除ActivityDeliveryInfo信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteActivityDeliveryInfo(EntityDto<Guid> input);

        /// <summary>
        /// 批量删除ActivityDeliveryInfo
        /// </summary>
        Task BatchDeleteActivityDeliveryInfosAsync(List<Guid> input);

        /// <summary>
        /// 批量标注未邮寄为已邮寄
        /// </summary>
        /// <param name="idList">邮寄信息idList</param>
        /// <returns></returns>
        Task UpdateIsSend(List<Guid> idList);
    }
}
