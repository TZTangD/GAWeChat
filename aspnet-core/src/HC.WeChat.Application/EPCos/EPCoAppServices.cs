using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;

using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using HC.WeChat.EPCos.Authorization;
using HC.WeChat.EPCos.Dtos;
using HC.WeChat.EPCos.DomainServices;
using HC.WeChat.EPCos;
using System;

namespace HC.WeChat.EPCos
{
    /// <summary>
    /// EPCo应用层服务的接口实现方法
    /// </summary>
    [AbpAuthorize(EPCoAppPermissions.EPCo)]
    public class EPCoAppService : WeChatAppServiceBase, IEPCoAppService
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<EPCo, Guid> _epcoRepository;
        private readonly IEPCoManager _epcoManager;

        /// <summary>
        /// 构造函数
        /// </summary>
        public EPCoAppService(IRepository<EPCo, Guid> epcoRepository
      , IEPCoManager epcoManager
        )
        {
            _epcoRepository = epcoRepository;
            _epcoManager = epcoManager;
        }

        /// <summary>
        /// 获取EPCo的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<EPCoListDto>> GetPagedEPCos(GetEPCosInput input)
        {

            var query = _epcoRepository.GetAll();
            //TODO:根据传入的参数添加过滤条件
            var epcoCount = await query.CountAsync();

            var epcos = await query
                .OrderBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();

            //var epcoListDtos = ObjectMapper.Map<List <EPCoListDto>>(epcos);
            var epcoListDtos = epcos.MapTo<List<EPCoListDto>>();

            return new PagedResultDto<EPCoListDto>(
                epcoCount,
                epcoListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取EPCoListDto信息
        /// </summary>
        public async Task<EPCoListDto> GetEPCoByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _epcoRepository.GetAsync(input.Id);

            return entity.MapTo<EPCoListDto>();
        }

        /// <summary>
        /// 导出EPCo为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetEPCosToExcel(){
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
        public async Task<GetEPCoForEditOutput> GetEPCoForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetEPCoForEditOutput();
            EPCoEditDto epcoEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _epcoRepository.GetAsync(input.Id.Value);

                epcoEditDto = entity.MapTo<EPCoEditDto>();

                //epcoEditDto = ObjectMapper.Map<List <epcoEditDto>>(entity);
            }
            else
            {
                epcoEditDto = new EPCoEditDto();
            }

            output.EPCo = epcoEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改EPCo的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateEPCo(CreateOrUpdateEPCoInput input)
        {

            if (input.EPCo.Id.HasValue)
            {
                await UpdateEPCoAsync(input.EPCo);
            }
            else
            {
                await CreateEPCoAsync(input.EPCo);
            }
        }

        /// <summary>
        /// 新增EPCo
        /// </summary>
        [AbpAuthorize(EPCoAppPermissions.EPCo_CreateEPCo)]
        protected virtual async Task<EPCoEditDto> CreateEPCoAsync(EPCoEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<EPCo>(input);

            entity = await _epcoRepository.InsertAsync(entity);
            return entity.MapTo<EPCoEditDto>();
        }

        /// <summary>
        /// 编辑EPCo
        /// </summary>
        [AbpAuthorize(EPCoAppPermissions.EPCo_EditEPCo)]
        protected virtual async Task UpdateEPCoAsync(EPCoEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _epcoRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            await _epcoRepository.UpdateAsync(entity);
        }

        /// <summary>
        /// 删除EPCo信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [AbpAuthorize(EPCoAppPermissions.EPCo_DeleteEPCo)]
        public async Task DeleteEPCo(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _epcoRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除EPCo的方法
        /// </summary>
        [AbpAuthorize(EPCoAppPermissions.EPCo_BatchDeleteEPCos)]
        public async Task BatchDeleteEPCosAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _epcoRepository.DeleteAsync(s => input.Contains(s.Id));
        }

    }
}

