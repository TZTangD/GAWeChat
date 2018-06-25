using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using System.Linq;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;

using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using HC.WeChat.UserAddresses.Authorization;
using HC.WeChat.UserAddresses.DomainServices;
using HC.WeChat.UserAddresss;
using HC.WeChat.Authorization;
using System;
using HC.WeChat.UserAddresss.Dtos;

namespace HC.WeChat.UserAddresses
{
    /// <summary>
    /// UserAddress应用层服务的接口实现方法
    /// </summary>
    //[AbpAuthorize(UserAddressAppPermissions.UserAddress)]
    [AbpAuthorize(AppPermissions.Pages)]
    public class UserAddressAppService : WeChatAppServiceBase, IUserAddressAppService
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<UserAddress, Guid> _useraddressRepository;
        private readonly IUserAddressManager _useraddressManager;

        /// <summary>
        /// 构造函数
        /// </summary>
        public UserAddressAppService(IRepository<UserAddress, Guid> useraddressRepository
      , IUserAddressManager useraddressManager
        )
        {
            _useraddressRepository = useraddressRepository;
            _useraddressManager = useraddressManager;
        }

        /// <summary>
        /// 获取UserAddress的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<UserAddressListDto>> GetPagedUserAddresss(GetUserAddresssInput input)
        {

            var query = _useraddressRepository.GetAll();
            //TODO:根据传入的参数添加过滤条件
            var useraddressCount = await query.CountAsync();

            var useraddresss = await query
                .OrderBy(input.Sorting).AsNoTracking()
                .PageBy(input)
                .ToListAsync();

            //var useraddressListDtos = ObjectMapper.Map<List <UserAddressListDto>>(useraddresss);
            var useraddressListDtos = useraddresss.MapTo<List<UserAddressListDto>>();

            return new PagedResultDto<UserAddressListDto>(
                useraddressCount,
                useraddressListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取UserAddressListDto信息
        /// </summary>
        public async Task<UserAddressListDto> GetUserAddressByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _useraddressRepository.GetAsync(input.Id);

            return entity.MapTo<UserAddressListDto>();
        }

        /// <summary>
        /// 导出UserAddress为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetUserAddresssToExcel(){
        //var users = await UserManager.Users.ToListAsync();
        //var userListDtos = ObjectMapper.Map<List<UserListDto>>(users);
        //await FillRoleNames(userListDtos);
        //return _userListExcelExporter.ExportToFile(userListDtos);
        //}
        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<GetUserAddressForEditOutput> GetUserAddressForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetUserAddressForEditOutput();
            UserAddressEditDto useraddressEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _useraddressRepository.GetAsync(input.Id.Value);

                useraddressEditDto = entity.MapTo<UserAddressEditDto>();

                //useraddressEditDto = ObjectMapper.Map<List <useraddressEditDto>>(entity);
            }
            else
            {
                useraddressEditDto = new UserAddressEditDto();
            }

            output.UserAddress = useraddressEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改UserAddress的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateUserAddress(CreateOrUpdateUserAddressInput input)
        {

            if (input.UserAddress.Id.HasValue)
            {
                await UpdateUserAddressAsync(input.UserAddress);
            }
            else
            {
                await CreateUserAddressAsync(input.UserAddress);
            }
        }

        /// <summary>
        /// 新增UserAddress
        /// </summary>
        //[AbpAuthorize(UserAddressAppPermissions.UserAddress_CreateUserAddress)]
        protected virtual async Task<UserAddressEditDto> CreateUserAddressAsync(UserAddressEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<UserAddress>(input);

            entity = await _useraddressRepository.InsertAsync(entity);
            return entity.MapTo<UserAddressEditDto>();
        }

        /// <summary>
        /// 编辑UserAddress
        /// </summary>
        //[AbpAuthorize(UserAddressAppPermissions.UserAddress_EditUserAddress)]
        protected virtual async Task UpdateUserAddressAsync(UserAddressEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _useraddressRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            await _useraddressRepository.UpdateAsync(entity);
        }

        /// <summary>
        /// 删除UserAddress信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        //[AbpAuthorize(UserAddressAppPermissions.UserAddress_DeleteUserAddress)]
        public async Task DeleteUserAddress(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _useraddressRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除UserAddress的方法
        /// </summary>
        //[AbpAuthorize(UserAddressAppPermissions.UserAddress_BatchDeleteUserAddresses)] 
        public async Task BatchDeleteUserAddresssAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _useraddressRepository.DeleteAsync(s => input.Contains(s.Id));
        }

    }
}

