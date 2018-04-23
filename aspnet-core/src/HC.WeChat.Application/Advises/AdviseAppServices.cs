using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;

using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using HC.WeChat.Advises.Authorization;
using HC.WeChat.Advises.Dtos;
using HC.WeChat.Advises.DomainServices;
using HC.WeChat.Advises;
using System;
using HC.WeChat.Dto;
using HC.WeChat.Authorization;
using System.Linq;

namespace HC.WeChat.Advises
{
    /// <summary>
    /// Advise应用层服务的接口实现方法
    /// </summary>
    //[AbpAuthorize(AdviseAppPermissions.Advise)]
    [AbpAuthorize(AppPermissions.Pages)]
    public class AdviseAppService : WeChatAppServiceBase, IAdviseAppService
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<Advise, Guid> _adviseRepository;
        private readonly IAdviseManager _adviseManager;

        /// <summary>
        /// 构造函数
        /// </summary>
        public AdviseAppService(IRepository<Advise, Guid> adviseRepository
      , IAdviseManager adviseManager
        )
        {
            _adviseRepository = adviseRepository;
            _adviseManager = adviseManager;
        }

        /// <summary>
        /// 获取Advise的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<AdviseListDto>> GetPagedAdvises(GetAdvisesInput input)
        {

            var query = _adviseRepository.GetAll()
                .WhereIf(!string.IsNullOrEmpty(input.Filter), a => a.Title.Contains(input.Filter) || a.Phone.Contains(input.Filter) || a.Content.Contains(input.Filter));
            //TODO:根据传入的参数添加过滤条件
            var adviseCount = await query.CountAsync();

            var advises = await query
                .OrderByDescending(a => a.CreationTime)
                .PageBy(input)
                .ToListAsync();

            //var adviseListDtos = ObjectMapper.Map<List <AdviseListDto>>(advises);
            var adviseListDtos = advises.MapTo<List<AdviseListDto>>();

            return new PagedResultDto<AdviseListDto>(
                adviseCount,
                adviseListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取AdviseListDto信息
        /// </summary>
        public async Task<AdviseListDto> GetAdviseByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _adviseRepository.GetAsync(input.Id);

            return entity.MapTo<AdviseListDto>();
        }

        /// <summary>
        /// 导出Advise为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetAdvisesToExcel(){
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
        public async Task<GetAdviseForEditOutput> GetAdviseForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetAdviseForEditOutput();
            AdviseEditDto adviseEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _adviseRepository.GetAsync(input.Id.Value);

                adviseEditDto = entity.MapTo<AdviseEditDto>();

                //adviseEditDto = ObjectMapper.Map<List <adviseEditDto>>(entity);
            }
            else
            {
                adviseEditDto = new AdviseEditDto();
            }

            output.Advise = adviseEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改Advise的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateAdvise(CreateOrUpdateAdviseInput input)
        {

            if (input.Advise.Id.HasValue)
            {
                await UpdateAdviseAsync(input.Advise);
            }
            else
            {
                await CreateAdviseAsync(input.Advise);
            }
        }

        /// <summary>
        /// 新增Advise
        /// </summary>
        //[AbpAuthorize(AdviseAppPermissions.Advise_CreateAdvise)]
        protected virtual async Task<AdviseEditDto> CreateAdviseAsync(AdviseEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<Advise>(input);

            entity = await _adviseRepository.InsertAsync(entity);
            return entity.MapTo<AdviseEditDto>();
        }

        /// <summary>
        /// 编辑Advise
        /// </summary>
        //[AbpAuthorize(AdviseAppPermissions.Advise_EditAdvise)]
        protected virtual async Task UpdateAdviseAsync(AdviseEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _adviseRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            await _adviseRepository.UpdateAsync(entity);
        }

        /// <summary>
        /// 删除Advise信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        //[AbpAuthorize(AdviseAppPermissions.Advise_DeleteAdvise)]
        public async Task DeleteAdvise(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _adviseRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除Advise的方法
        /// </summary>
        //[AbpAuthorize(AdviseAppPermissions.Advise_BatchDeleteAdvises)]
        public async Task BatchDeleteAdvisesAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _adviseRepository.DeleteAsync(s => input.Contains(s.Id));
        }

        [AbpAllowAnonymous]
        public async Task<APIResultDto> SubmitAdviseAsync(AdviseDto input)
        {
            var advise = input.MapTo<Advise>();
            advise.CreationTime = DateTime.Now;
            await _adviseRepository.InsertAsync(advise);
            return new APIResultDto() { Code = 0, Msg = "提交成功，我们会尽快处理" };
        }
    }
}

