using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;

using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using HC.WeChat.IntegralDetails.Authorization;
using HC.WeChat.IntegralDetails.Dtos;
using HC.WeChat.IntegralDetails.DomainServices;
using HC.WeChat.IntegralDetails;
using System;

namespace HC.WeChat.IntegralDetails
{
    /// <summary>
    /// IntegralDetail应用层服务的接口实现方法
    /// </summary>
    [AbpAuthorize(IntegralDetailAppPermissions.IntegralDetail)]
    public class IntegralDetailAppService : WeChatAppServiceBase, IIntegralDetailAppService
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<IntegralDetail, Guid> _integraldetailRepository;
        private readonly IIntegralDetailManager _integraldetailManager;

        /// <summary>
        /// 构造函数
        /// </summary>
        public IntegralDetailAppService(IRepository<IntegralDetail, Guid> integraldetailRepository
      , IIntegralDetailManager integraldetailManager
        )
        {
            _integraldetailRepository = integraldetailRepository;
            _integraldetailManager = integraldetailManager;
        }

        /// <summary>
        /// 获取IntegralDetail的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<IntegralDetailListDto>> GetPagedIntegralDetails(GetIntegralDetailsInput input)
        {

            var query = _integraldetailRepository.GetAll();
            //TODO:根据传入的参数添加过滤条件
            var integraldetailCount = await query.CountAsync();

            var integraldetails = await query
                .OrderBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();

            //var integraldetailListDtos = ObjectMapper.Map<List <IntegralDetailListDto>>(integraldetails);
            var integraldetailListDtos = integraldetails.MapTo<List<IntegralDetailListDto>>();

            return new PagedResultDto<IntegralDetailListDto>(
                integraldetailCount,
                integraldetailListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取IntegralDetailListDto信息
        /// </summary>
        public async Task<IntegralDetailListDto> GetIntegralDetailByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _integraldetailRepository.GetAsync(input.Id);

            return entity.MapTo<IntegralDetailListDto>();
        }

        /// <summary>
        /// 导出IntegralDetail为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetIntegralDetailsToExcel(){
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
        public async Task<GetIntegralDetailForEditOutput> GetIntegralDetailForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetIntegralDetailForEditOutput();
            IntegralDetailEditDto integraldetailEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _integraldetailRepository.GetAsync(input.Id.Value);

                integraldetailEditDto = entity.MapTo<IntegralDetailEditDto>();

                //integraldetailEditDto = ObjectMapper.Map<List <integraldetailEditDto>>(entity);
            }
            else
            {
                integraldetailEditDto = new IntegralDetailEditDto();
            }

            output.IntegralDetail = integraldetailEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改IntegralDetail的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateIntegralDetail(CreateOrUpdateIntegralDetailInput input)
        {

            if (input.IntegralDetail.Id.HasValue)
            {
                await UpdateIntegralDetailAsync(input.IntegralDetail);
            }
            else
            {
                await CreateIntegralDetailAsync(input.IntegralDetail);
            }
        }

        /// <summary>
        /// 新增IntegralDetail
        /// </summary>
        [AbpAuthorize(IntegralDetailAppPermissions.IntegralDetail_CreateIntegralDetail)]
        protected virtual async Task<IntegralDetailEditDto> CreateIntegralDetailAsync(IntegralDetailEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<IntegralDetail>(input);

            entity = await _integraldetailRepository.InsertAsync(entity);
            return entity.MapTo<IntegralDetailEditDto>();
        }

        /// <summary>
        /// 编辑IntegralDetail
        /// </summary>
        [AbpAuthorize(IntegralDetailAppPermissions.IntegralDetail_EditIntegralDetail)]
        protected virtual async Task UpdateIntegralDetailAsync(IntegralDetailEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _integraldetailRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            await _integraldetailRepository.UpdateAsync(entity);
        }

        /// <summary>
        /// 删除IntegralDetail信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [AbpAuthorize(IntegralDetailAppPermissions.IntegralDetail_DeleteIntegralDetail)]
        public async Task DeleteIntegralDetail(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _integraldetailRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除IntegralDetail的方法
        /// </summary>
        [AbpAuthorize(IntegralDetailAppPermissions.IntegralDetail_BatchDeleteIntegralDetails)]
        public async Task BatchDeleteIntegralDetailsAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _integraldetailRepository.DeleteAsync(s => input.Contains(s.Id));
        }

    }
}

