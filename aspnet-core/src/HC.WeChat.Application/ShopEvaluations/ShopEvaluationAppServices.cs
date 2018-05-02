using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using System.Linq;

using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using HC.WeChat.ShopEvaluations.Authorization;
using HC.WeChat.ShopEvaluations.Dtos;
using HC.WeChat.ShopEvaluations.DomainServices;
using HC.WeChat.ShopEvaluations;
using System;
using HC.WeChat.PurchaseRecords;
using HC.WeChat.WeChatUsers;
using HC.WeChat.Authorization;

namespace HC.WeChat.ShopEvaluations
{
    /// <summary>
    /// ShopEvaluation应用层服务的接口实现方法
    /// </summary>
    //[AbpAuthorize(ShopEvaluationAppPermissions.ShopEvaluation)]
    [AbpAuthorize(AppPermissions.Pages)]
    public class ShopEvaluationAppService : WeChatAppServiceBase, IShopEvaluationAppService
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<ShopEvaluation, Guid> _shopevaluationRepository;
        private readonly IShopEvaluationManager _shopevaluationManager;
        private readonly IRepository<PurchaseRecord, Guid> _purchaserecordRepository;
        private readonly IRepository<WeChatUser, Guid> _wechatuserRepository;
        /// <summary>
        /// 构造函数
        /// </summary>
        public ShopEvaluationAppService(IRepository<ShopEvaluation, Guid> shopevaluationRepository
      , IShopEvaluationManager shopevaluationManager, IRepository<PurchaseRecord, Guid> purchaserecordRepository,
            IRepository<WeChatUser, Guid> wechatuserRepository
        )
        {
            _shopevaluationRepository = shopevaluationRepository;
            _shopevaluationManager = shopevaluationManager;
            _purchaserecordRepository = purchaserecordRepository;
            _wechatuserRepository = wechatuserRepository;
        }

        /// <summary>
        /// 获取ShopEvaluation的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<ShopEvaluationListDto>> GetPagedShopEvaluations(GetShopEvaluationsInput input)
        {

            var query = _shopevaluationRepository.GetAll();
            //TODO:根据传入的参数添加过滤条件
            var shopevaluationCount = await query.CountAsync();

            var shopevaluations = await query
                .OrderBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();

            //var shopevaluationListDtos = ObjectMapper.Map<List <ShopEvaluationListDto>>(shopevaluations);
            var shopevaluationListDtos = shopevaluations.MapTo<List<ShopEvaluationListDto>>();

            return new PagedResultDto<ShopEvaluationListDto>(
                shopevaluationCount,
                shopevaluationListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取ShopEvaluationListDto信息
        /// </summary>
        public async Task<ShopEvaluationListDto> GetShopEvaluationByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _shopevaluationRepository.GetAsync(input.Id);

            return entity.MapTo<ShopEvaluationListDto>();
        }

        /// <summary>
        /// 导出ShopEvaluation为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetShopEvaluationsToExcel(){
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
        public async Task<GetShopEvaluationForEditOutput> GetShopEvaluationForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetShopEvaluationForEditOutput();
            ShopEvaluationEditDto shopevaluationEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _shopevaluationRepository.GetAsync(input.Id.Value);

                shopevaluationEditDto = entity.MapTo<ShopEvaluationEditDto>();

                //shopevaluationEditDto = ObjectMapper.Map<List <shopevaluationEditDto>>(entity);
            }
            else
            {
                shopevaluationEditDto = new ShopEvaluationEditDto();
            }

            output.ShopEvaluation = shopevaluationEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改ShopEvaluation的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateShopEvaluation(CreateOrUpdateShopEvaluationInput input)
        {

            if (input.ShopEvaluation.Id.HasValue)
            {
                await UpdateShopEvaluationAsync(input.ShopEvaluation);
            }
            else
            {
                await CreateShopEvaluationAsync(input.ShopEvaluation);
            }
        }

        /// <summary>
        /// 新增ShopEvaluation
        /// </summary>
        //[AbpAuthorize(ShopEvaluationAppPermissions.ShopEvaluation_CreateShopEvaluation)]
        protected virtual async Task<ShopEvaluationEditDto> CreateShopEvaluationAsync(ShopEvaluationEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<ShopEvaluation>(input);

            entity = await _shopevaluationRepository.InsertAsync(entity);
            return entity.MapTo<ShopEvaluationEditDto>();
        }

        /// <summary>
        /// 编辑ShopEvaluation
        /// </summary>
        //[AbpAuthorize(ShopEvaluationAppPermissions.ShopEvaluation_EditShopEvaluation)]
        protected virtual async Task UpdateShopEvaluationAsync(ShopEvaluationEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _shopevaluationRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            await _shopevaluationRepository.UpdateAsync(entity);
        }

        /// <summary>
        /// 删除ShopEvaluation信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        //[AbpAuthorize(ShopEvaluationAppPermissions.ShopEvaluation_DeleteShopEvaluation)]
        public async Task DeleteShopEvaluation(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _shopevaluationRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除ShopEvaluation的方法
        /// </summary>
        //[AbpAuthorize(ShopEvaluationAppPermissions.ShopEvaluation_BatchDeleteShopEvaluations)]
        public async Task BatchDeleteShopEvaluationsAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _shopevaluationRepository.DeleteAsync(s => input.Contains(s.Id));
        }

        /// <summary>
        /// 获取ShopEvaluation的分页列表信息联合购买记录表
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<ShopEvaluationListDto>> GetPagedShopEvaluationsByPurchaseRecord(GetShopEvaluationsInput input)
        {
            //if (input.ShopId == Guid.Empty)
            //{
            //    return new PagedResultDto<ShopEvaluationListDto>(0, new List<ShopEvaluationListDto>());
            //}
            var queryEvaluation = _shopevaluationRepository.GetAll()
                .Where(e=>e.ShopId==input.ShopId)
                .WhereIf(input.Evaluation.HasValue,e=>e.Evaluation==input.Evaluation);
            var queryPurchase = _purchaserecordRepository.GetAll();
            var queryWeChat = _wechatuserRepository.GetAll();
            var query = from e in queryEvaluation
                        join p in queryPurchase on e.PurchaseRecordId equals p.Id into queryE
                        from ep in queryE.DefaultIfEmpty()
                        join w in queryWeChat on ep.OpenId equals w.OpenId into queryP
                        from epw in queryP.DefaultIfEmpty()
                        select new ShopEvaluationListDto
                        {
                            Id = e.Id,
                            PurchaseRecordId = e.PurchaseRecordId,
                            Specification = ep != null ? ep.Specification : "",
                            Quantity = ep != null ? ep.Quantity : null,
                            ShopId = e.ShopId,
                            OpenId = e.OpenId,
                            Evaluation = e.Evaluation,
                            IsCorrectQuantity = e.IsCorrectQuantity,
                            Content = e.Content,
                            CreationTime = e.CreationTime,
                            TenantId = e.TenantId,
                            NickName = epw != null ? epw.NickName : ""
                        };

            //TODO:根据传入的参数添加过滤条件
            var shopevaluationCount = await query.CountAsync();

            var shopevaluations = await query
                .OrderByDescending(e=>e.CreationTime)
                .ThenBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();

            //var shopevaluationListDtos = ObjectMapper.Map<List <ShopEvaluationListDto>>(shopevaluations);
            var shopevaluationListDtos = shopevaluations.MapTo<List<ShopEvaluationListDto>>();

            return new PagedResultDto<ShopEvaluationListDto>(
                shopevaluationCount,
                shopevaluationListDtos
                );

        }

    }
}

