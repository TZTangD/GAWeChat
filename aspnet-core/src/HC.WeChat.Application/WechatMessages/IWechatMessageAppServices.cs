using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HC.WeChat.WechatMessages.Dtos;
using HC.WeChat.WechatMessages;
using System;

namespace HC.WeChat.WechatMessages
{
    /// <summary>
    /// WechatMessage应用层服务的接口方法
    /// </summary>
    public interface IWechatMessageAppService : IApplicationService
    {
        /// <summary>
        /// 获取WechatMessage的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<WechatMessageListDto>> GetPagedWechatMessages(GetWechatMessagesInput input);

        /// <summary>
        /// 通过指定id获取WechatMessageListDto信息
        /// </summary>
        Task<WechatMessageListDto> GetWechatMessageByIdAsync(EntityDto<Guid> input);

        /// <summary>
        /// 导出WechatMessage为excel表
        /// </summary>
        /// <returns></returns>
        //  Task<FileDto> GetWechatMessagesToExcel();
        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<GetWechatMessageForEditOutput> GetWechatMessageForEdit(NullableIdDto<Guid> input);

        //todo:缺少Dto的生成GetWechatMessageForEditOutput
        /// <summary>
        /// 添加或者修改WechatMessage的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateOrUpdateWechatMessage(CreateOrUpdateWechatMessageInput input);

        /// <summary>
        /// 删除WechatMessage信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteWechatMessage(EntityDto<Guid> input);

        /// <summary>
        /// 批量删除WechatMessage
        /// </summary>
        Task BatchDeleteWechatMessagesAsync(List<Guid> input);

        /// <summary>
        /// 更新或删除关键字回复消息
        /// </summary>
        /// <param name="input">关键字回复实体</param>
        /// <returns></returns>
        Task CreateOrUpdateWechatMessageDto(WechatMessageEditDto input);
    }
}
