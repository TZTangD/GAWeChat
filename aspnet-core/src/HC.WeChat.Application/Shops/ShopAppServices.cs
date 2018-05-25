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
using HC.WeChat.WechatEnums;
using HC.WeChat.ShopProducts;
using HC.WeChat.Products;
using HC.WeChat.Helpers;
using Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage;
using HC.WeChat.WechatAppConfigs.Dtos;
using HC.WeChat.WechatAppConfigs;
using Senparc.Weixin.MP.AdvancedAPIs;

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
        private readonly IRepository<ShopProduct, Guid> _shopProductRepository;
        private readonly IRepository<Product, Guid> _productRepository;
        IWechatAppConfigAppService _wechatAppConfigAppService;

        private int? TenantId { get; set; }
        private WechatAppConfigInfo AppConfig { get; set; }

        /// <summary>
        /// 构造函数
        /// </summary>
        public ShopAppService(IRepository<Shop, Guid> shopRepository
        , IShopManager shopManager, IRepository<Retailer, Guid> retailerRepository
        , IWeChatUserManager wechatuserManager
        , IRepository<ShopProduct, Guid> shopProductRepository
        , IRepository<Product, Guid> productRepository
            , IWechatAppConfigAppService wechatAppConfigAppService
        )
        {
            _shopRepository = shopRepository;
            _shopManager = shopManager;
            _retailerRepository = retailerRepository;
            _wechatuserManager = wechatuserManager;
            _shopProductRepository = shopProductRepository;
            _productRepository = productRepository;
            _wechatAppConfigAppService = wechatAppConfigAppService;
            TenantId = null;
            AppConfig = _wechatAppConfigAppService.GetWechatAppConfig(TenantId).Result;
        }

        /// <summary>
        /// 获取Shop的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<ShopListDto>> GetPagedShops(GetShopsInput input)
        {

            var query = _shopRepository.GetAll()
                .WhereIf(!string.IsNullOrEmpty(input.Name), s => s.Name.Contains(input.Name))
                .WhereIf(input.Status.HasValue, s => s.Status == input.Status);
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
                                    QqLatitude = s.QqLatitude,
                                    QqLongitude = s.QqLongitude,
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

        /// <summary>
        /// 店铺审核
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CheckShop(CheckShopDto input)
        {
            var entity = await _shopRepository.GetAsync(input.Id);
            entity.Status = input.Status;
            entity.AuditTime = DateTime.Now;
            var result = _shopRepository.UpdateAsync(entity);
            //return result.MapTo<ShopEditDto>();
        }

        /// <summary>
        /// 根据当前位置获取附近店铺
        /// </summary>
        /// <returns></returns>
        [AbpAllowAnonymous]
        public async Task<List<NearbyShopDto>> GetNearbyShopByLocationAsync(double latitude, double longitude, int? tenantId, string openId)
        {
            var mbr = new MapMBR(latitude, longitude, 3.1);//确定搜索范围3.1公里 搜索范围扩大0.1公里
            using (CurrentUnitOfWork.SetTenantId(tenantId))
            {
                //演示注释 后面需要放开
                //根据经纬度范围过滤数据
                //var dataList = await _shopRepository.GetAll()
                //    .Where(s => s.Status == ShopAuditStatus.审核通过
                //    && s.Latitude > mbr.MinLatitude 
                //    && s.Latitude < mbr.MaxLatitude
                //    && s.Longitude > mbr.MinLongitude
                //    && s.Longitude < mbr.MaxLongitude).ToListAsync();

                //var resultList = dataList.MapTo<List<NearbyShopDto>>();
                //foreach (var item in resultList)
                //{
                //    if (item.Latitude.HasValue && item.Longitude.HasValue)
                //    {
                //        item.Distance = Math.Round(AbpMapByGoogle.GetDistance(latitude, longitude, item.Latitude.Value, item.Longitude.Value), 0);//不保留小数
                //    }
                //    else
                //    {
                //        item.Distance = 4000;//后面会被过滤
                //    }
                //}

                var resultList = (await _shopRepository.GetAll().ToListAsync()).MapTo<List<NearbyShopDto>>();
                int[] rd = { 92, 108, 201, 255, 374, 488, 509 };
                int i = 0;
                foreach (var item in resultList)
                {
                    item.Distance = 100 + rd[i];
                    i++;
                    if (i == rd.Length)
                    {
                        i = 0;
                    }
                }

                return resultList.Where(r => r.Distance <= 3000).OrderBy(r => r.Distance).ToList();
            }
        }

        [AbpAllowAnonymous]
        public async Task<ShopListDto> GetViewShopByIdAsync(Guid id, int? tenantId)
        {
            using (CurrentUnitOfWork.SetTenantId(tenantId))
            {
                var shop = await _shopRepository.GetAsync(id);
                shop.ReadTotal++;
                return shop.MapTo<ShopListDto>();
            }
        }

        [AbpAllowAnonymous]
        public async Task<List<ShopListDto>> GetShopListByGoodsIdAsync(int? tenantId, Guid goodsId)
        {
            using (CurrentUnitOfWork.SetTenantId(tenantId))
            {
                var product = await _productRepository.GetAsync(goodsId);
                product.SearchCount = product.SearchCount ?? 0;
                product.SearchCount++;
                var shopIds = await _shopProductRepository.GetAll()
                    .Where(s => s.ProductId == goodsId)
                    .Select(s => s.ShopId).ToArrayAsync();
                var shops = await _shopRepository.GetAll().Where(s => shopIds.Contains(s.Id)).ToListAsync();
                return shops.MapTo<List<ShopListDto>>();
            }
        }

        //[AbpAllowAnonymous]
        //public async Task<ShopListDto> CreateWeChatGroup(ShopEditDto input)
        //{
        //   // var result = new ShopEditDto();
        //   //var data = await TemplateApi.
        //   // ;

        //   // return result;
        //}
    }
}

