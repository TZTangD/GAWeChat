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
using HC.WeChat.LuckyDraws.Authorization;
using HC.WeChat.LuckyDraws.Dtos;
using HC.WeChat.LuckyDraws.DomainServices;
using HC.WeChat.LuckyDraws;
using System;
using HC.WeChat.Authorization;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.LuckyDraws
{
    /// <summary>
    /// LuckyDraw应用层服务的接口实现方法
    /// </summary>
    //[AbpAuthorize(LuckyDrawAppPermissions.LuckyDraw)]
    [AbpAuthorize(AppPermissions.Pages)]
    public class LuckyDrawAppService : WeChatAppServiceBase, ILuckyDrawAppService
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<LuckyDraw, Guid> _luckydrawRepository;
        private readonly ILuckyDrawManager _luckydrawManager;

        /// <summary>
        /// 构造函数
        /// </summary>
        public LuckyDrawAppService(IRepository<LuckyDraw, Guid> luckydrawRepository
      , ILuckyDrawManager luckydrawManager
        )
        {
            _luckydrawRepository = luckydrawRepository;
            _luckydrawManager = luckydrawManager;
        }

        /// <summary>
        /// 获取LuckyDraw的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<LuckyDrawListDto>> GetPagedLuckyDraws(GetLuckyDrawsInput input)
        {

            var query = _luckydrawRepository.GetAll();
            //TODO:根据传入的参数添加过滤条件
            var luckydrawCount = await query.CountAsync();

            var luckydraws = await query
                .OrderBy(input.Sorting).AsNoTracking()
                .PageBy(input)
                .ToListAsync();

            //var luckydrawListDtos = ObjectMapper.Map<List <LuckyDrawListDto>>(luckydraws);
            var luckydrawListDtos = luckydraws.MapTo<List<LuckyDrawListDto>>();

            return new PagedResultDto<LuckyDrawListDto>(
                luckydrawCount,
                luckydrawListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取LuckyDrawListDto信息
        /// </summary>
        public async Task<LuckyDrawListDto> GetLuckyDrawByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _luckydrawRepository.GetAsync(input.Id);

            return entity.MapTo<LuckyDrawListDto>();
        }

        /// <summary>
        /// 导出LuckyDraw为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetLuckyDrawsToExcel(){
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
        public async Task<GetLuckyDrawForEditOutput> GetLuckyDrawForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetLuckyDrawForEditOutput();
            LuckyDrawEditDto luckydrawEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _luckydrawRepository.GetAsync(input.Id.Value);

                luckydrawEditDto = entity.MapTo<LuckyDrawEditDto>();

                //luckydrawEditDto = ObjectMapper.Map<List <luckydrawEditDto>>(entity);
            }
            else
            {
                luckydrawEditDto = new LuckyDrawEditDto();
            }

            output.LuckyDraw = luckydrawEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改LuckyDraw的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateLuckyDraw(CreateOrUpdateLuckyDrawInput input)
        {

            if (input.LuckyDraw.Id.HasValue)
            {
                await UpdateLuckyDrawAsync(input.LuckyDraw);
            }
            else
            {
                await CreateLuckyDrawAsync(input.LuckyDraw);
            }
        }

        /// <summary>
        /// 新增LuckyDraw
        /// </summary>
        //[AbpAuthorize(LuckyDrawAppPermissions.LuckyDraw_CreateLuckyDraw)]
        protected virtual async Task<LuckyDrawEditDto> CreateLuckyDrawAsync(LuckyDrawEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<LuckyDraw>(input);

            entity = await _luckydrawRepository.InsertAsync(entity);
            return entity.MapTo<LuckyDrawEditDto>();
        }

        /// <summary>
        /// 编辑LuckyDraw
        /// </summary>
        //[AbpAuthorize(LuckyDrawAppPermissions.LuckyDraw_EditLuckyDraw)]
        protected virtual async Task<LuckyDrawEditDto> UpdateLuckyDrawAsync(LuckyDrawEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _luckydrawRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            entity = await _luckydrawRepository.UpdateAsync(entity);
            return entity.MapTo<LuckyDrawEditDto>();
        }

        /// <summary>
        /// 删除LuckyDraw信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        //[AbpAuthorize(LuckyDrawAppPermissions.LuckyDraw_DeleteLuckyDraw)]
        public async Task DeleteLuckyDraw(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _luckydrawRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除LuckyDraw的方法
        /// </summary>
        //[AbpAuthorize(LuckyDrawAppPermissions.LuckyDraw_BatchDeleteLuckyDraws)]
        public async Task BatchDeleteLuckyDrawsAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _luckydrawRepository.DeleteAsync(s => input.Contains(s.Id));
        }

        /// <summary>
        /// 新增或更新抽奖活动
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<LuckyDrawEditDto> CreateOrUpdateLuckyDrawNew(LuckyDrawEditDto input)
        {
            if (input.Id.HasValue)
            {
                return await UpdateLuckyDrawAsync(input);
            }
            else
            {
                input.Type = LotteryType.积分抽奖;
                return await CreateLuckyDrawAsync(input);
            }
        }

        /// <summary>
        /// 获取积分抽奖信息
        /// </summary>
        /// <returns></returns>
        public async Task<LuckyDrawListDto> GetSingleLuckyDraw()
        {
            var result = await _luckydrawRepository.GetAll().Where(l => l.Type == LotteryType.积分抽奖).FirstOrDefaultAsync();
            return result.MapTo<LuckyDrawListDto>();
        }
    }
}

