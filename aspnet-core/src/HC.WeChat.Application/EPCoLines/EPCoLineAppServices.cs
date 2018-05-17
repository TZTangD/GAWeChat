using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;

using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using HC.WeChat.EPCoLines.Authorization;
using HC.WeChat.EPCoLines.Dtos;
using HC.WeChat.EPCoLines.DomainServices;
using HC.WeChat.EPCoLines;
using System;

namespace HC.WeChat.EPCoLines
{
    /// <summary>
    /// EPCoLine应用层服务的接口实现方法
    /// </summary>
    [AbpAuthorize(EPCoLineAppPermissions.EPCoLine)]
    public class EPCoLineAppService : WeChatAppServiceBase, IEPCoLineAppService
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<EPCoLine, Guid> _epcolineRepository;
        private readonly IEPCoLineManager _epcolineManager;

        /// <summary>
        /// 构造函数
        /// </summary>
        public EPCoLineAppService(IRepository<EPCoLine, Guid> epcolineRepository
      , IEPCoLineManager epcolineManager
        )
        {
            _epcolineRepository = epcolineRepository;
            _epcolineManager = epcolineManager;
        }

        /// <summary>
        /// 获取EPCoLine的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<EPCoLineListDto>> GetPagedEPCoLines(GetEPCoLinesInput input)
        {

            var query = _epcolineRepository.GetAll();
            //TODO:根据传入的参数添加过滤条件
            var epcolineCount = await query.CountAsync();

            var epcolines = await query
                .OrderBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();

            //var epcolineListDtos = ObjectMapper.Map<List <EPCoLineListDto>>(epcolines);
            var epcolineListDtos = epcolines.MapTo<List<EPCoLineListDto>>();

            return new PagedResultDto<EPCoLineListDto>(
                epcolineCount,
                epcolineListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取EPCoLineListDto信息
        /// </summary>
        public async Task<EPCoLineListDto> GetEPCoLineByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _epcolineRepository.GetAsync(input.Id);

            return entity.MapTo<EPCoLineListDto>();
        }

        /// <summary>
        /// 导出EPCoLine为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetEPCoLinesToExcel(){
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
        public async Task<GetEPCoLineForEditOutput> GetEPCoLineForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetEPCoLineForEditOutput();
            EPCoLineEditDto epcolineEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _epcolineRepository.GetAsync(input.Id.Value);

                epcolineEditDto = entity.MapTo<EPCoLineEditDto>();

                //epcolineEditDto = ObjectMapper.Map<List <epcolineEditDto>>(entity);
            }
            else
            {
                epcolineEditDto = new EPCoLineEditDto();
            }

            output.EPCoLine = epcolineEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改EPCoLine的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateEPCoLine(CreateOrUpdateEPCoLineInput input)
        {

            if (input.EPCoLine.Id.HasValue)
            {
                await UpdateEPCoLineAsync(input.EPCoLine);
            }
            else
            {
                await CreateEPCoLineAsync(input.EPCoLine);
            }
        }

        /// <summary>
        /// 新增EPCoLine
        /// </summary>
        [AbpAuthorize(EPCoLineAppPermissions.EPCoLine_CreateEPCoLine)]
        protected virtual async Task<EPCoLineEditDto> CreateEPCoLineAsync(EPCoLineEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<EPCoLine>(input);

            entity = await _epcolineRepository.InsertAsync(entity);
            return entity.MapTo<EPCoLineEditDto>();
        }

        /// <summary>
        /// 编辑EPCoLine
        /// </summary>
        [AbpAuthorize(EPCoLineAppPermissions.EPCoLine_EditEPCoLine)]
        protected virtual async Task UpdateEPCoLineAsync(EPCoLineEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _epcolineRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            await _epcolineRepository.UpdateAsync(entity);
        }

        /// <summary>
        /// 删除EPCoLine信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [AbpAuthorize(EPCoLineAppPermissions.EPCoLine_DeleteEPCoLine)]
        public async Task DeleteEPCoLine(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _epcolineRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除EPCoLine的方法
        /// </summary>
        [AbpAuthorize(EPCoLineAppPermissions.EPCoLine_BatchDeleteEPCoLines)]
        public async Task BatchDeleteEPCoLinesAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _epcolineRepository.DeleteAsync(s => input.Contains(s.Id));
        }

    }
}

