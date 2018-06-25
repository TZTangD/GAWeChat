using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HC.WeChat.UserAddresss.Dtos;
using HC.WeChat.UserAddresss;
using System;

namespace HC.WeChat.UserAddresses
{
    /// <summary>
    /// UserAddress应用层服务的接口方法
    /// </summary>
    public interface IUserAddressAppService : IApplicationService
    {
        /// <summary>
        /// 获取UserAddress的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<UserAddressListDto>> GetPagedUserAddresss(GetUserAddresssInput input);

        /// <summary>
        /// 通过指定id获取UserAddressListDto信息
        /// </summary>
        Task<UserAddressListDto> GetUserAddressByIdAsync(EntityDto<Guid> input);

        /// <summary>
        /// 导出UserAddress为excel表
        /// </summary>
        /// <returns></returns>
        //  Task<FileDto> GetUserAddresssToExcel();
        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<GetUserAddressForEditOutput> GetUserAddressForEdit(NullableIdDto<Guid> input);

        //todo:缺少Dto的生成GetUserAddressForEditOutput
        /// <summary>
        /// 添加或者修改UserAddress的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateOrUpdateUserAddress(CreateOrUpdateUserAddressInput input);

        /// <summary>
        /// 删除UserAddress信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteUserAddress(EntityDto<Guid> input);

        /// <summary>
        /// 批量删除UserAddress
        /// </summary>
        Task BatchDeleteUserAddresssAsync(List<Guid> input);
    }
}
