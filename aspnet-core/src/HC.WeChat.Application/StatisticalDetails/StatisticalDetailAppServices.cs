using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;

using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using HC.WeChat.StatisticalDetails.Authorization;
using HC.WeChat.StatisticalDetails.Dtos;
using HC.WeChat.StatisticalDetails.DomainServices;
using HC.WeChat.StatisticalDetails;
using System;

namespace HC.WeChat.StatisticalDetails
{
    /// <summary>
    /// StatisticalDetail应用层服务的接口实现方法
    /// </summary>
    [AbpAuthorize(StatisticalDetailAppPermissions.StatisticalDetail)]
    public class StatisticalDetailAppService : WeChatAppServiceBase, IStatisticalDetailAppService
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<StatisticalDetail, Guid> _statisticaldetailRepository;
        private readonly IStatisticalDetailManager _statisticaldetailManager;

        /// <summary>
        /// 构造函数
        /// </summary>
        public StatisticalDetailAppService(IRepository<StatisticalDetail, Guid> statisticaldetailRepository
      , IStatisticalDetailManager statisticaldetailManager
        )
        {
            _statisticaldetailRepository = statisticaldetailRepository;
            _statisticaldetailManager = statisticaldetailManager;
        }

        /// <summary>
        /// 获取StatisticalDetail的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<StatisticalDetailListDto>> GetPagedStatisticalDetails(GetStatisticalDetailsInput input)
        {

            var query = _statisticaldetailRepository.GetAll();
            //TODO:根据传入的参数添加过滤条件
            var statisticaldetailCount = await query.CountAsync();

            var statisticaldetails = await query
                .OrderBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();

            //var statisticaldetailListDtos = ObjectMapper.Map<List <StatisticalDetailListDto>>(statisticaldetails);
            var statisticaldetailListDtos = statisticaldetails.MapTo<List<StatisticalDetailListDto>>();

            return new PagedResultDto<StatisticalDetailListDto>(
                statisticaldetailCount,
                statisticaldetailListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取StatisticalDetailListDto信息
        /// </summary>
        public async Task<StatisticalDetailListDto> GetStatisticalDetailByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _statisticaldetailRepository.GetAsync(input.Id);

            return entity.MapTo<StatisticalDetailListDto>();
        }

        /// <summary>
        /// 导出StatisticalDetail为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetStatisticalDetailsToExcel(){
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
        public async Task<GetStatisticalDetailForEditOutput> GetStatisticalDetailForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetStatisticalDetailForEditOutput();
            StatisticalDetailEditDto statisticaldetailEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _statisticaldetailRepository.GetAsync(input.Id.Value);

                statisticaldetailEditDto = entity.MapTo<StatisticalDetailEditDto>();

                //statisticaldetailEditDto = ObjectMapper.Map<List <statisticaldetailEditDto>>(entity);
            }
            else
            {
                statisticaldetailEditDto = new StatisticalDetailEditDto();
            }

            output.StatisticalDetail = statisticaldetailEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改StatisticalDetail的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateStatisticalDetail(CreateOrUpdateStatisticalDetailInput input)
        {

            if (input.StatisticalDetail.Id.HasValue)
            {
                await UpdateStatisticalDetailAsync(input.StatisticalDetail);
            }
            else
            {
                await CreateStatisticalDetailAsync(input.StatisticalDetail);
            }
        }

        /// <summary>
        /// 新增StatisticalDetail
        /// </summary>
        [AbpAuthorize(StatisticalDetailAppPermissions.StatisticalDetail_CreateStatisticalDetail)]
        protected virtual async Task<StatisticalDetailEditDto> CreateStatisticalDetailAsync(StatisticalDetailEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<StatisticalDetail>(input);

            entity = await _statisticaldetailRepository.InsertAsync(entity);
            return entity.MapTo<StatisticalDetailEditDto>();
        }

        /// <summary>
        /// 编辑StatisticalDetail
        /// </summary>
        [AbpAuthorize(StatisticalDetailAppPermissions.StatisticalDetail_EditStatisticalDetail)]
        protected virtual async Task UpdateStatisticalDetailAsync(StatisticalDetailEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _statisticaldetailRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            await _statisticaldetailRepository.UpdateAsync(entity);
        }

        /// <summary>
        /// 删除StatisticalDetail信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [AbpAuthorize(StatisticalDetailAppPermissions.StatisticalDetail_DeleteStatisticalDetail)]
        public async Task DeleteStatisticalDetail(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _statisticaldetailRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除StatisticalDetail的方法
        /// </summary>
        [AbpAuthorize(StatisticalDetailAppPermissions.StatisticalDetail_BatchDeleteStatisticalDetails)]
        public async Task BatchDeleteStatisticalDetailsAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _statisticaldetailRepository.DeleteAsync(s => input.Contains(s.Id));
        }

    }
}

