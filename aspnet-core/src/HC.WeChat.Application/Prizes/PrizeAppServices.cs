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
using HC.WeChat.Prizes.Authorization;
using HC.WeChat.Prizes.Dtos;
using HC.WeChat.Prizes.DomainServices;
using HC.WeChat.Prizes;
using System;
using HC.WeChat.Authorization;

namespace HC.WeChat.Prizes
{
    /// <summary>
    /// Prize应用层服务的接口实现方法
    /// </summary>
    //[AbpAuthorize(PrizeAppPermissions.Prize)]
    [AbpAuthorize(AppPermissions.Pages)]
    public class PrizeAppService : WeChatAppServiceBase, IPrizeAppService
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<Prize, Guid> _prizeRepository;
        private readonly IPrizeManager _prizeManager;

        /// <summary>
        /// 构造函数
        /// </summary>
        public PrizeAppService(IRepository<Prize, Guid> prizeRepository
      , IPrizeManager prizeManager
        )
        {
            _prizeRepository = prizeRepository;
            _prizeManager = prizeManager;
        }

        /// <summary>
        /// 获取Prize的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<PrizeListDto>> GetPagedPrizes(GetPrizesInput input)
        {

            var query = _prizeRepository.GetAll();
            //TODO:根据传入的参数添加过滤条件
            var prizeCount = await query.CountAsync();

            var prizes = await query
                .OrderBy(input.Sorting).AsNoTracking()
                .PageBy(input)
                .ToListAsync();

            //var prizeListDtos = ObjectMapper.Map<List <PrizeListDto>>(prizes);
            var prizeListDtos = prizes.MapTo<List<PrizeListDto>>();

            return new PagedResultDto<PrizeListDto>(
                prizeCount,
                prizeListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取PrizeListDto信息
        /// </summary>
        public async Task<PrizeListDto> GetPrizeByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _prizeRepository.GetAsync(input.Id);

            return entity.MapTo<PrizeListDto>();
        }

        /// <summary>
        /// 导出Prize为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetPrizesToExcel(){
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
        public async Task<GetPrizeForEditOutput> GetPrizeForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetPrizeForEditOutput();
            PrizeEditDto prizeEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _prizeRepository.GetAsync(input.Id.Value);

                prizeEditDto = entity.MapTo<PrizeEditDto>();

                //prizeEditDto = ObjectMapper.Map<List <prizeEditDto>>(entity);
            }
            else
            {
                prizeEditDto = new PrizeEditDto();
            }

            output.Prize = prizeEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改Prize的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdatePrize(CreateOrUpdatePrizeInput input)
        {

            if (input.Prize.Id.HasValue)
            {
                await UpdatePrizeAsync(input.Prize);
            }
            else
            {
                await CreatePrizeAsync(input.Prize);
            }
        }

        /// <summary>
        /// 新增Prize
        /// </summary>
        //[AbpAuthorize(PrizeAppPermissions.Prize_CreatePrize)]
        protected virtual async Task<PrizeEditDto> CreatePrizeAsync(PrizeEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<Prize>(input);

            entity = await _prizeRepository.InsertAsync(entity);
            return entity.MapTo<PrizeEditDto>();
        }

        /// <summary>
        /// 编辑Prize
        /// </summary>
        //[AbpAuthorize(PrizeAppPermissions.Prize_EditPrize)]
        protected virtual async Task UpdatePrizeAsync(PrizeEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _prizeRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            await _prizeRepository.UpdateAsync(entity);
        }

        /// <summary>
        /// 删除Prize信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        //[AbpAuthorize(PrizeAppPermissions.Prize_DeletePrize)]
        public async Task DeletePrize(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _prizeRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除Prize的方法
        /// </summary>
        //[AbpAuthorize(PrizeAppPermissions.Prize_BatchDeletePrizes)]
        public async Task BatchDeletePrizesAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _prizeRepository.DeleteAsync(s => input.Contains(s.Id));
        }

    }
}

