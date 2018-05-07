using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HC.WeChat.WechatSubscribes.Dtos;
using HC.WeChat.WechatSubscribes;
using System;

namespace HC.WeChat.WechatSubscribes
{
    /// <summary>
    /// WechatSubscribe应用层服务的接口方法
    /// </summary>
    public interface IWechatSubscribeAppService : IApplicationService
    {
        /// <summary>
        /// 获取WechatSubscribe的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<WechatSubscribeListDto>> GetPagedWechatSubscribes(GetWechatSubscribesInput input);

        /// <summary>
        /// 通过指定id获取WechatSubscribeListDto信息
        /// </summary>
        Task<WechatSubscribeListDto> GetWechatSubscribeByIdAsync(EntityDto<Guid> input);

        /// <summary>
        /// 导出WechatSubscribe为excel表
        /// </summary>
        /// <returns></returns>
        //  Task<FileDto> GetWechatSubscribesToExcel();
        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<GetWechatSubscribeForEditOutput> GetWechatSubscribeForEdit(NullableIdDto<Guid> input);

        //todo:缺少Dto的生成GetWechatSubscribeForEditOutput
        /// <summary>
        /// 添加或者修改WechatSubscribe的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateOrUpdateWechatSubscribe(CreateOrUpdateWechatSubscribeInput input);

        /// <summary>
        /// 删除WechatSubscribe信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteWechatSubscribe(EntityDto<Guid> input);

        /// <summary>
        /// 批量删除WechatSubscribe
        /// </summary>
        Task BatchDeleteWechatSubscribesAsync(List<Guid> input);

        /// <summary>
        /// 通过租户id获取关注回复消息
        /// </summary>
        /// <returns></returns>
        Task<WechatSubscribeListDto> GetSubscribeInfoByTenantId();

        /// <summary>
        /// 更新或修改被关注回复
        /// </summary>
        /// <param name="input">被关注回复实体</param>
        /// <returns></returns>
        Task CreateOrUpdateWechatSubscribeDto(WechatSubscribeEditDto input);
    }
}
