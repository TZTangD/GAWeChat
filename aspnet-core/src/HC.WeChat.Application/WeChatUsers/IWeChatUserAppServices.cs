using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HC.WeChat.WeChatUsers.Dtos;
using HC.WeChat.WeChatUsers;
using System;
using HC.WeChat.Dto;

namespace HC.WeChat.WeChatUsers
{
    /// <summary>
    /// WeChatUser应用层服务的接口方法
    /// </summary>
    public interface IWeChatUserAppService : IApplicationService
    {
        /// <summary>
        /// 获取WeChatUser的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<WeChatUserListDto>> GetPagedWeChatUsers(GetWeChatUsersInput input);

        /// <summary>
        /// 通过指定id获取WeChatUserListDto信息
        /// </summary>
        Task<WeChatUserListDto> GetWeChatUserByIdAsync(EntityDto<Guid> input);

        /// <summary>
        /// 导出WeChatUser为excel表
        /// </summary>
        /// <returns></returns>
        //  Task<FileDto> GetWeChatUsersToExcel();
        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<GetWeChatUserForEditOutput> GetWeChatUserForEdit(NullableIdDto<Guid> input);

        //todo:缺少Dto的生成GetWeChatUserForEditOutput
        /// <summary>
        /// 添加或者修改WeChatUser的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateOrUpdateWeChatUser(CreateOrUpdateWeChatUserInput input);

        /// <summary>
        /// 删除WeChatUser信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteWeChatUser(EntityDto<Guid> input);

        /// <summary>
        /// 批量删除WeChatUser
        /// </summary>
        Task BatchDeleteWeChatUsersAsync(List<Guid> input);

        Task<APIResultDto> BindWeChatUserAsync(UserBindDto input);


        Task<WeChatUserListDto> GetWeChatUserAsync(string openId, int? tenantId);

        /// <summary>
        /// 添加或者修改WeChatUser的方法
        /// </summary>
        /// <param name="input">微信用户实体</param>
        /// <returns></returns>
        Task CreateOrUpdateWeChatUserDto(WeChatUserEditDto input);
    }
}
