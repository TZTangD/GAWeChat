using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HC.WeChat.WeChatGroups.Dtos;
using HC.WeChat.WeChatGroups;
using HC.WeChat.Dto;

namespace HC.WeChat.WeChatGroups
{
    /// <summary>
    /// WeChatGroup应用层服务的接口方法
    /// </summary>
    public interface IWeChatGroupAppService : IApplicationService
    {
        /// <summary>
        /// 获取WeChatGroup的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<WeChatGroupListDto>> GetPagedWeChatGroups(GetWeChatGroupsInput input);

        /// <summary>
        /// 通过指定id获取WeChatGroupListDto信息
        /// </summary>
        Task<WeChatGroupListDto> GetWeChatGroupByIdAsync(EntityDto<int> input);

        /// <summary>
        /// 导出WeChatGroup为excel表
        /// </summary>
        /// <returns></returns>
        //  Task<FileDto> GetWeChatGroupsToExcel();
        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<GetWeChatGroupForEditOutput> GetWeChatGroupForEdit(NullableIdDto<int> input);

        //todo:缺少Dto的生成GetWeChatGroupForEditOutput
        /// <summary>
        /// 添加或者修改WeChatGroup的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateOrUpdateWeChatGroup(CreateOrUpdateWeChatGroupInput input);

        /// <summary>
        /// 删除WeChatGroup信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteWeChatGroup(EntityDto<int> input);

        /// <summary>
        /// 批量删除WeChatGroup
        /// </summary>
        Task BatchDeleteWeChatGroupsAsync(List<int> input);

        /// <summary>
        /// 创建分组
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateWeChatGroup(WeChatGroupListDto input);

        /// <summary>
        /// 修改分组
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task UpdateWeChatGroup(WeChatGroupListDto input);

        /// <summary>
        /// 单个标记用户分组
        /// </summary>
        /// <param name="openId"></param>
        /// <param name="tagId"></param>
        /// <returns></returns>
        Task MarkWeChatGroup(string openId, int tagId);

        /// <summary>
        /// 批量标记用户分组
        /// </summary>
        /// <returns></returns>
        Task BatchMarkWeChatGroup();
    }
}
