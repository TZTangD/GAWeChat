using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;

using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using HC.WeChat.GACustPoints.Authorization;
using HC.WeChat.GACustPoints.Dtos;
using HC.WeChat.GACustPoints.DomainServices;
using HC.WeChat.GACustPoints;
using System;

namespace HC.WeChat.GACustPoints
{
    /// <summary>
    /// GACustPoint应用层服务的接口实现方法
    /// </summary>
    [AbpAuthorize(GACustPointAppPermissions.GACustPoint)]
    public class GACustPointAppService : WeChatAppServiceBase, IGACustPointAppService
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<GACustPoint, Guid> _gacustpointRepository;
        private readonly IGACustPointManager _gacustpointManager;

        /// <summary>
        /// 构造函数
        /// </summary>
        public GACustPointAppService(IRepository<GACustPoint, Guid> gacustpointRepository
      , IGACustPointManager gacustpointManager
        )
        {
            _gacustpointRepository = gacustpointRepository;
            _gacustpointManager = gacustpointManager;
        }

        /// <summary>
        /// 获取GACustPoint的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<GACustPointListDto>> GetPagedGACustPoints(GetGACustPointsInput input)
        {

            var query = _gacustpointRepository.GetAll();
            //TODO:根据传入的参数添加过滤条件
            var gacustpointCount = await query.CountAsync();

            var gacustpoints = await query
                .OrderBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();

            //var gacustpointListDtos = ObjectMapper.Map<List <GACustPointListDto>>(gacustpoints);
            var gacustpointListDtos = gacustpoints.MapTo<List<GACustPointListDto>>();

            return new PagedResultDto<GACustPointListDto>(
                gacustpointCount,
                gacustpointListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取GACustPointListDto信息
        /// </summary>
        public async Task<GACustPointListDto> GetGACustPointByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _gacustpointRepository.GetAsync(input.Id);

            return entity.MapTo<GACustPointListDto>();
        }

        /// <summary>
        /// 导出GACustPoint为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetGACustPointsToExcel(){
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
        public async Task<GetGACustPointForEditOutput> GetGACustPointForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetGACustPointForEditOutput();
            GACustPointEditDto gacustpointEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _gacustpointRepository.GetAsync(input.Id.Value);

                gacustpointEditDto = entity.MapTo<GACustPointEditDto>();

                //gacustpointEditDto = ObjectMapper.Map<List <gacustpointEditDto>>(entity);
            }
            else
            {
                gacustpointEditDto = new GACustPointEditDto();
            }

            output.GACustPoint = gacustpointEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改GACustPoint的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateGACustPoint(CreateOrUpdateGACustPointInput input)
        {

            if (input.GACustPoint.Id.HasValue)
            {
                await UpdateGACustPointAsync(input.GACustPoint);
            }
            else
            {
                await CreateGACustPointAsync(input.GACustPoint);
            }
        }

        /// <summary>
        /// 新增GACustPoint
        /// </summary>
        [AbpAuthorize(GACustPointAppPermissions.GACustPoint_CreateGACustPoint)]
        protected virtual async Task<GACustPointEditDto> CreateGACustPointAsync(GACustPointEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<GACustPoint>(input);

            entity = await _gacustpointRepository.InsertAsync(entity);
            return entity.MapTo<GACustPointEditDto>();
        }

        /// <summary>
        /// 编辑GACustPoint
        /// </summary>
        [AbpAuthorize(GACustPointAppPermissions.GACustPoint_EditGACustPoint)]
        protected virtual async Task UpdateGACustPointAsync(GACustPointEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _gacustpointRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            await _gacustpointRepository.UpdateAsync(entity);
        }

        /// <summary>
        /// 删除GACustPoint信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [AbpAuthorize(GACustPointAppPermissions.GACustPoint_DeleteGACustPoint)]
        public async Task DeleteGACustPoint(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _gacustpointRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除GACustPoint的方法
        /// </summary>
        [AbpAuthorize(GACustPointAppPermissions.GACustPoint_BatchDeleteGACustPoints)]
        public async Task BatchDeleteGACustPointsAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _gacustpointRepository.DeleteAsync(s => input.Contains(s.Id));
        }

    }
}

