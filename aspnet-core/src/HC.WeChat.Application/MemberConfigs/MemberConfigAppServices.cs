using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;

using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using HC.WeChat.MemberConfigs.Authorization;
using HC.WeChat.MemberConfigs.Dtos;
using HC.WeChat.MemberConfigs.DomainServices;
using HC.WeChat.MemberConfigs;
using System;

namespace HC.WeChat.MemberConfigs
{
    /// <summary>
    /// MemberConfig应用层服务的接口实现方法
    /// </summary>
    [AbpAuthorize(MemberConfigAppPermissions.MemberConfig)]
    public class MemberConfigAppService : WeChatAppServiceBase, IMemberConfigAppService
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<MemberConfig, Guid> _memberconfigRepository;
        private readonly IMemberConfigManager _memberconfigManager;

        /// <summary>
        /// 构造函数
        /// </summary>
        public MemberConfigAppService(IRepository<MemberConfig, Guid> memberconfigRepository
      , IMemberConfigManager memberconfigManager
        )
        {
            _memberconfigRepository = memberconfigRepository;
            _memberconfigManager = memberconfigManager;
        }

        /// <summary>
        /// 获取MemberConfig的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<MemberConfigListDto>> GetPagedMemberConfigs(GetMemberConfigsInput input)
        {

            var query = _memberconfigRepository.GetAll();
            //TODO:根据传入的参数添加过滤条件
            var memberconfigCount = await query.CountAsync();

            var memberconfigs = await query
                .OrderBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();

            //var memberconfigListDtos = ObjectMapper.Map<List <MemberConfigListDto>>(memberconfigs);
            var memberconfigListDtos = memberconfigs.MapTo<List<MemberConfigListDto>>();

            return new PagedResultDto<MemberConfigListDto>(
                memberconfigCount,
                memberconfigListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取MemberConfigListDto信息
        /// </summary>
        public async Task<MemberConfigListDto> GetMemberConfigByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _memberconfigRepository.GetAsync(input.Id);

            return entity.MapTo<MemberConfigListDto>();
        }

        /// <summary>
        /// 导出MemberConfig为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetMemberConfigsToExcel(){
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
        public async Task<GetMemberConfigForEditOutput> GetMemberConfigForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetMemberConfigForEditOutput();
            MemberConfigEditDto memberconfigEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _memberconfigRepository.GetAsync(input.Id.Value);

                memberconfigEditDto = entity.MapTo<MemberConfigEditDto>();

                //memberconfigEditDto = ObjectMapper.Map<List <memberconfigEditDto>>(entity);
            }
            else
            {
                memberconfigEditDto = new MemberConfigEditDto();
            }

            output.MemberConfig = memberconfigEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改MemberConfig的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateMemberConfig(CreateOrUpdateMemberConfigInput input)
        {

            if (input.MemberConfig.Id.HasValue)
            {
                await UpdateMemberConfigAsync(input.MemberConfig);
            }
            else
            {
                await CreateMemberConfigAsync(input.MemberConfig);
            }
        }

        /// <summary>
        /// 新增MemberConfig
        /// </summary>
        [AbpAuthorize(MemberConfigAppPermissions.MemberConfig_CreateMemberConfig)]
        protected virtual async Task<MemberConfigEditDto> CreateMemberConfigAsync(MemberConfigEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<MemberConfig>(input);

            entity = await _memberconfigRepository.InsertAsync(entity);
            return entity.MapTo<MemberConfigEditDto>();
        }

        /// <summary>
        /// 编辑MemberConfig
        /// </summary>
        [AbpAuthorize(MemberConfigAppPermissions.MemberConfig_EditMemberConfig)]
        protected virtual async Task UpdateMemberConfigAsync(MemberConfigEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _memberconfigRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            await _memberconfigRepository.UpdateAsync(entity);
        }

        /// <summary>
        /// 删除MemberConfig信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [AbpAuthorize(MemberConfigAppPermissions.MemberConfig_DeleteMemberConfig)]
        public async Task DeleteMemberConfig(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _memberconfigRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除MemberConfig的方法
        /// </summary>
        [AbpAuthorize(MemberConfigAppPermissions.MemberConfig_BatchDeleteMemberConfigs)]
        public async Task BatchDeleteMemberConfigsAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _memberconfigRepository.DeleteAsync(s => input.Contains(s.Id));
        }

    }
}

