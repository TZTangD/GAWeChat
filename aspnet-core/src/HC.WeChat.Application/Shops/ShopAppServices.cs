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
using HC.WeChat.Shops.Authorization;
using HC.WeChat.Shops.Dtos;
using HC.WeChat.Shops.DomainServices;
using HC.WeChat.Shops;
using System;
using HC.WeChat.Authorization;
using HC.WeChat.Retailers;
using HC.WeChat.WeChatUsers.DomainServices;

namespace HC.WeChat.Shops
{
    /// <summary>
    /// Shop应用层服务的接口实现方法
    /// </summary>
    //[AbpAuthorize(ShopAppPermissions.Shop)]
    [AbpAuthorize(AppPermissions.Pages)]
    public class ShopAppService : WeChatAppServiceBase, IShopAppService
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<Shop, Guid> _shopRepository;
        private readonly IShopManager _shopManager;
        private readonly IRepository<Retailer, Guid> _retailerRepository;
        private readonly IWeChatUserManager _wechatuserManager;

        /// <summary>
        /// 构造函数
        /// </summary>
        public ShopAppService(IRepository<Shop, Guid> shopRepository
      , IShopManager shopManager, IRepository<Retailer, Guid> retailerRepository
        , IWeChatUserManager wechatuserManager
        )
        {
            _shopRepository = shopRepository;
            _shopManager = shopManager;
            _retailerRepository = retailerRepository;
            _wechatuserManager = wechatuserManager;
        }

        /// <summary>
        /// 获取Shop的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<ShopListDto>> GetPagedShops(GetShopsInput input)
        {

            var query = _shopRepository.GetAll()
                .WhereIf(!string.IsNullOrEmpty(input.Name),s=>s.Name.Contains(input.Name))
                .WhereIf(input.Status.HasValue,s=>s.Status==input.Status);
            //TODO:根据传入的参数添加过滤条件
            var shopCount = await query.CountAsync();

            var shops = await query
                .OrderByDescending(s=>s.CreationTime)
                .ThenBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();

            //var shopListDtos = ObjectMapper.Map<List <ShopListDto>>(shops);
            var shopListDtos = shops.MapTo<List<ShopListDto>>();

            return new PagedResultDto<ShopListDto>(
                shopCount,
                shopListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取ShopListDto信息
        /// </summary>
        public async Task<ShopListDto> GetShopByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _shopRepository.GetAsync(input.Id);

            return entity.MapTo<ShopListDto>();
        }

        /// <summary>
        /// 导出Shop为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetShopsToExcel(){
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
        public async Task<GetShopForEditOutput> GetShopForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetShopForEditOutput();
            ShopEditDto shopEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _shopRepository.GetAsync(input.Id.Value);

                shopEditDto = entity.MapTo<ShopEditDto>();

                //shopEditDto = ObjectMapper.Map<List <shopEditDto>>(entity);
            }
            else
            {
                shopEditDto = new ShopEditDto();
            }

            output.Shop = shopEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改Shop的公共方法
        /// </summary>
        public async Task CreateOrUpdateShop(CreateOrUpdateShopInput input)
        {
            if (input.Shop.Id.HasValue)
            {
                await UpdateShopAsync(input.Shop);
            }
            else
            {
                await CreateShopAsync(input.Shop);
            }
        }

        [AbpAllowAnonymous]
        public async Task WechatCreateOrUpdateShop(CreateOrUpdateShopInput input)
        {
            using (CurrentUnitOfWork.SetTenantId(input.TenantId))
            {
                if (input.Shop.Id.HasValue)
                {
                    input.Shop.Status = WechatEnums.ShopAuditStatus.提交申请;                  
                    await UpdateShopAsync(input.Shop);
                }
                else
                {
                    var user = await _wechatuserManager.GetWeChatUserAsync(input.OpenId, input.TenantId);
                    input.Shop.TenantId = input.TenantId;
                    input.Shop.RetailerId = user.UserId;
                    input.Shop.Status = WechatEnums.ShopAuditStatus.提交申请;
                    input.Shop.ReadTotal = 0;
                    input.Shop.SaleTotal = 0;
                    input.Shop.Evaluation = "0,0,0";
                    await CreateShopAsync(input.Shop);
                }
            }
        }

        /// <summary>
        /// 新增Shop
        /// </summary>
        //[AbpAuthorize(ShopAppPermissions.Shop_CreateShop)]

        [AbpAllowAnonymous]
        protected virtual async Task<ShopEditDto> CreateShopAsync(ShopEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<Shop>(input);

            entity = await _shopRepository.InsertAsync(entity);
            return entity.MapTo<ShopEditDto>();
        }

        /// <summary>
        /// 编辑Shop
        /// </summary>
        //[AbpAuthorize(ShopAppPermissions.Shop_EditShop)]
        [AbpAllowAnonymous]
        protected virtual async Task UpdateShopAsync(ShopEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _shopRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            entity = await _shopRepository.UpdateAsync(entity);
            entity.MapTo<ShopEditDto>();
        }

        /// <summary>
        /// 删除Shop信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        //[AbpAuthorize(ShopAppPermissions.Shop_DeleteShop)]
        public async Task DeleteShop(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _shopRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除Shop的方法
        /// </summary>
        //[AbpAuthorize(ShopAppPermissions.Shop_BatchDeleteShops)]
        public async Task BatchDeleteShopsAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _shopRepository.DeleteAsync(s => input.Contains(s.Id));
        }


        /// <summary>
        /// 添加或者修改Shop的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateShopDto(ShopEditDto input)
        {
            var entity = new ShopEditDto();
            if (input.Id.HasValue)
            {
                 await UpdateShopAsync(input);
            }
            else
            {
                 await CreateShopAsync(input);
            }
            //return await GetShopByIdRetailerAsync(entity.Id);

        }

        /// <summary>
        /// 获取Shop的分页列表信息(连接零售客户表)
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<ShopListDto>> GetPagedShopsByRetailer(GetShopsInput input)
        {

            var queryShop = _shopRepository.GetAll()
                .WhereIf(!string.IsNullOrEmpty(input.Name), s => s.Name.Contains(input.Name))
                .WhereIf(input.Status.HasValue, s => s.Status == input.Status)
                .WhereIf(!string.IsNullOrEmpty(input.Tel), s => s.Tel.Contains(input.Tel));
            var queryRetailer = _retailerRepository.GetAll();
            var query = from s in queryShop
                        join r in queryRetailer on s.RetailerId equals r.Id into queryS
                        from sr in queryS.DefaultIfEmpty()
                        select new ShopListDto
                        {
                            Id = s.Id,
                            Name = s.Name,
                            Address = s.Address,
                            Desc = s.Desc,
                            RetailerId = s.RetailerId,
                            CoverPhoto = s.CoverPhoto,
                            SaleTotal = s.SaleTotal,
                            ReadTotal = s.ReadTotal,
                            Evaluation = s.Evaluation,
                            Longitude = s.Longitude,
                            Latitude = s.Latitude,
                            Status = s.Status,
                            AuditTime = s.AuditTime,
                            CreationTime = s.CreationTime,
                            TenantId = s.TenantId,
                            Tel = s.Tel,
                            RetailerName = sr != null ? sr.Name : "",
                        };

            //TODO:根据传入的参数添加过滤条件
            var shopCount = await query.CountAsync();

            var shops = await query
                .OrderByDescending(s => s.CreationTime)
                .ThenBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();

            //var shopListDtos = ObjectMapper.Map<List <ShopListDto>>(shops);
            var shopListDtos = shops.MapTo<List<ShopListDto>>();

            return new PagedResultDto<ShopListDto>(
                shopCount,
                shopListDtos
                );

        }

        /// <summary>
        /// 获取单个店铺信息（连接零售客户表）
        /// </summary>
        /// <param name="input">零售户Id</param>
        /// <returns></returns>
        public async Task<ShopListDto> GetShopByIdRetailerAsync(Guid? id)
        {
            var queryShop = _shopRepository.GetAll()
                .Where(s => s.Id == id);

            var queryRetailer = _retailerRepository.GetAll();
            var entity = await (from s in queryShop
                                join r in queryRetailer on s.RetailerId equals r.Id into queryS
                                from sr in queryS.DefaultIfEmpty()
                                select new ShopListDto
                                {
                                    Id = s.Id,
                                    Name = s.Name,
                                    Address = s.Address,
                                    Desc = s.Desc,
                                    RetailerId = s.RetailerId,
                                    CoverPhoto = s.CoverPhoto,
                                    SaleTotal = s.SaleTotal,
                                    ReadTotal = s.ReadTotal,
                                    Evaluation = s.Evaluation,
                                    Longitude = s.Longitude,
                                    Latitude = s.Latitude,
                                    Status = s.Status,
                                    AuditTime = s.AuditTime,
                                    CreationTime = s.CreationTime,
                                    TenantId = s.TenantId,
                                    Tel = s.Tel,
                                    RetailerName = sr != null ? sr.Name : ""
                                }).SingleOrDefaultAsync();
            return entity;
        }

      
        [AbpAllowAnonymous]
        public async Task<ShopListDto> GetShopByOpenId(int? tenantId, string openId)
        {
            using (CurrentUnitOfWork.SetTenantId(tenantId))
            {
                var user = await _wechatuserManager.GetWeChatUserAsync(openId, tenantId);
                var shop = await _shopRepository.GetAll().Where(s => s.RetailerId == user.UserId).FirstOrDefaultAsync();
                return shop.MapTo<ShopListDto>();
            }
        }
    }
}

