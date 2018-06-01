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
using HC.WeChat.Products.Authorization;
using HC.WeChat.Products.Dtos;
using HC.WeChat.Products.DomainServices;
using HC.WeChat.Products;
using System;
using HC.WeChat.Authorization;
using Microsoft.AspNetCore.Hosting;
using HC.WeChat.Retailers;
using HC.WeChat.WeChatUsers;
using HC.WeChat.WechatEnums;
using HC.WeChat.EPCos;
using HC.WeChat.EPCoLines;
using HC.WeChat.GACustPoints;
using HC.WeChat.GAGrades;
using HC.WeChat.Retailers.Dtos;
//using System.Linq;

namespace HC.WeChat.Products
{
    /// <summary>
    /// Product应用层服务的接口实现方法
    /// </summary>
    //[AbpAuthorize(ProductAppPermissions.Product)]
    [AbpAuthorize(AppPermissions.Pages)]
    public class ProductAppService : WeChatAppServiceBase, IProductAppService
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<Product, Guid> _productRepository;
        private readonly IProductManager _productManager;
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IRetailerAppService _retailerService;
        private readonly IRepository<WeChatUser, Guid> _wechatuserRepository;
        private readonly IRepository<EPCo, Guid> _epcoRepository;
        private readonly IRepository<EPCoLine, Guid> _epcolineRepository;
        private readonly IRepository<GACustPoint, int> _gacustpointRepository;
        private readonly IRepository<GAGrade, int> _gagradeRepository;


        /// <summary>
        /// 构造函数
        /// </summary>
        public ProductAppService(IRepository<Product, Guid> productRepository
      , IProductManager productManager, IHostingEnvironment hostingEnvironment,
            IRetailerAppService retailerService, IRepository<WeChatUser, Guid> wechatuserRepository,
            IRepository<EPCo, Guid> epcoRepository, IRepository<EPCoLine, Guid> epcolineRepository,
            IRepository<GACustPoint, int> gacustpointRepository, IRepository<GAGrade, int> gagradeRepository
        )
        {
            _productRepository = productRepository;
            _productManager = productManager;
            _hostingEnvironment = hostingEnvironment;
            _retailerService = retailerService;
            _wechatuserRepository = wechatuserRepository;
            _epcoRepository = epcoRepository;
            _epcolineRepository = epcolineRepository;
            _gacustpointRepository = gacustpointRepository;
            _gagradeRepository = gagradeRepository;
        }

        /// <summary>
        /// 获取Product的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<ProductListDto>> GetPagedProducts(GetProductsInput input)
        {

            var query = _productRepository.GetAll()
                .WhereIf(!string.IsNullOrEmpty(input.Name), p => p.Specification.Contains(input.Name))
                .WhereIf(input.Type.HasValue, p => p.Type == input.Type)
                .WhereIf(input.IsRare.HasValue, p => p.IsRare == input.IsRare);
            //TODO:根据传入的参数添加过滤条件
            var productCount = await query.CountAsync();

            var products = await query
                .OrderBy(p => p.Specification)
                .ThenBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();

            //var productListDtos = ObjectMapper.Map<List <ProductListDto>>(products);
            var productListDtos = products.MapTo<List<ProductListDto>>();

            return new PagedResultDto<ProductListDto>(
                productCount,
                productListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取ProductListDto信息
        /// </summary>
        public async Task<ProductListDto> GetProductByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _productRepository.GetAsync(input.Id);

            return entity.MapTo<ProductListDto>();
        }

        /// <summary>
        /// 导出Product为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetProductsToExcel(){
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
        public async Task<GetProductForEditOutput> GetProductForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetProductForEditOutput();
            ProductEditDto productEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _productRepository.GetAsync(input.Id.Value);

                productEditDto = entity.MapTo<ProductEditDto>();

                //productEditDto = ObjectMapper.Map<List <productEditDto>>(entity);
            }
            else
            {
                productEditDto = new ProductEditDto();
            }

            output.Product = productEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改Product的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateProduct(CreateOrUpdateProductInput input)
        {

            if (input.Product.Id.HasValue)
            {
                await UpdateProductAsync(input.Product);
            }
            else
            {
                await CreateProductAsync(input.Product);
            }
        }

        /// <summary>
        /// 新增Product
        /// </summary>
        //[AbpAuthorize(ProductAppPermissions.Product_CreateProduct)]
        protected virtual async Task<ProductEditDto> CreateProductAsync(ProductEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<Product>(input);
            entity.SearchCount = 0;
            entity = await _productRepository.InsertAsync(entity);
            return entity.MapTo<ProductEditDto>();
        }

        /// <summary>
        /// 编辑Product
        /// </summary>
        //[AbpAuthorize(ProductAppPermissions.Product_EditProduct)]
        protected virtual async Task<ProductEditDto> UpdateProductAsync(ProductEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _productRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            var result = await _productRepository.UpdateAsync(entity);
            return result.MapTo<ProductEditDto>();
        }

        /// <summary>
        /// 删除Product信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        //[AbpAuthorize(ProductAppPermissions.Product_DeleteProduct)]
        public async Task DeleteProduct(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _productRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除Product的方法
        /// </summary>
        //[AbpAuthorize(ProductAppPermissions.Product_BatchDeleteProducts)]
        public async Task BatchDeleteProductsAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _productRepository.DeleteAsync(s => input.Contains(s.Id));
        }

        /// <summary>
        /// 通过指定id获取ProductListDto信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<ProductListDto> GetProductByIdDtoAsync(EntityDto<Guid> input)
        {
            var entity = await _productRepository.GetAll().Where(p => p.Id == input.Id).FirstOrDefaultAsync();
            return entity.MapTo<ProductListDto>();
        }


        /// <summary>
        /// 添加或者修改Product的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateProductDto(ProductEditDto input)
        {
            string webRootPath = _hostingEnvironment.WebRootPath;
          
            if (input.Id.HasValue)
            {
                var entity = _productRepository.GetAsync(input.Id.MapTo<Guid>()).Result;
                var url = entity.PhotoUrl;
                var result = await UpdateProductAsync(input);
                //删除原来的单个图片
                if (url != result.PhotoUrl && url!= "/assets/img/default.png")
                {
                    if (System.IO.File.Exists(webRootPath + url))
                    {
                        System.IO.File.Delete(webRootPath + url);
                    }
                }

            }
            else
            {
                await CreateProductAsync(input);
            }
        }

        /// <summary>
        /// 获取特色商品
        /// </summary>
        [AbpAllowAnonymous]
        public async Task<RareProductDto> GetRareProduct(int? tenantId)
        {
            using (CurrentUnitOfWork.SetTenantId(tenantId))
            {
                var query = _productRepository.GetAll().Where(p => p.IsRare == true && p.IsAction == true);

                RareProductDto data = new RareProductDto();
                data.CigaretteProducts = (await query.Where(q => q.Type == WechatEnums.ProductTypeEnum.卷烟类).OrderBy(q => q.Specification).ToListAsync()).MapTo<List<ProductListDto>>();
                data.SpecialProducts = (await query.Where(q => q.Type == WechatEnums.ProductTypeEnum.特产类).OrderBy(q => q.Specification).ToListAsync()).MapTo<List<ProductListDto>>();
                return data;
            }
        }

        [AbpAllowAnonymous]
        public async Task<ShopProductDto> GetShopProductByCode(string code, int? tenantId)
        {
            using (CurrentUnitOfWork.SetTenantId(tenantId))
            {
                var query = await _productRepository.GetAll()
                    .Where(p => p.IsAction == true && p.Type == WechatEnums.ProductTypeEnum.卷烟类)
                    .Where(p => p.PackageCode == code || p.BarCode == code)
                    .FirstOrDefaultAsync();
                var shopProduct = query.MapTo<ShopProductDto>();
                if (shopProduct != null)
                {
                    if (shopProduct.PackageCode == code)
                    {
                        shopProduct.Num = 1;
                    }
                    else
                    {
                        shopProduct.Num = 10;
                    }
                    return shopProduct;
                }

                return null;
            }
        }

        /// <summary>
        /// 检查包码条码是否重复（0：不重复，1：包码重复，2：条码重复，3：包码、条码重复）
        /// </summary>
        /// <param name="code"></param>
        /// <param name="tenantId"></param>
        /// <returns></returns>
        public async Task<int> GetCheckCode(CheckInput input)
        {
            var result = 0;
            var countP = await _productRepository.GetAll().Where(p => p.PackageCode == input.PCode || p.BarCode == input.PCode).WhereIf(input.ProductId != Guid.Empty, p => p.Id != input.ProductId).CountAsync();
            var countB = await _productRepository.GetAll().Where(p => p.BarCode == input.BCode || p.PackageCode == input.BCode).WhereIf(input.ProductId != Guid.Empty, p => p.Id != input.ProductId).CountAsync();
            //var entity = _productRepository.GetAll().Where(e => e.Id == input.ProductId).FirstOrDefault();

            if (countB > 0 && countP > 0)
            {
                result = 3;
            }
            else if (countB > 0 && countP == 0)
            {
                result = 2;
            }
            else if (countB == 0 && countP > 0)
            {
                result = 1;
            }
            return result;
        }

        [AbpAllowAnonymous]
        public async Task<List<RareProductSearchDto>> GetRareProductByKeyAsync(int? tenantId, string key)
        {
            using (CurrentUnitOfWork.SetTenantId(tenantId))
            {
                var query = await _productRepository.GetAll().Where(p => p.IsRare == true && p.IsAction == true && p.Specification.Contains(key)).ToListAsync();
                return query.MapTo<List<RareProductSearchDto>>();
            }
        }

        /// <summary>
        /// 获取台账信息
        /// </summary>
        /// <param name="userId">专卖证号</param>
        /// <returns></returns>
        [AbpAllowAnonymous]
        public async Task<RetailAllInfoDe> GetCustAndAccountInfoAsync(int? tenantId, Guid userId, int span)
        {
            using (CurrentUnitOfWork.SetTenantId(tenantId))
            {

                //RetailAllInfo result = new RetailAllInfo() { BasicInfo = new RetailInfoDto(), AccountBooks = new List<RetailAccount>() };
                RetailAllInfoDe result = new RetailAllInfoDe()
                {
                    //BasicInfo = new RetailInfoDto(),
                    MonthAccountBooks = new List<RetailAccountDe>(),
                    PreMonthAccountBooks = new List<RetailAccountDe>(),
                    AccountBooks = new List<RetailAccountDe>()
                };

                #region 原台账

                //var totalOrders = _epcoRepository.GetAll().Where(f => f.CUST_ID == retail.CustId);
                //var orderCodes = await totalOrders.Select(t => t.CO_NUM).ToListAsync();

                //var orderDetails = _epcolineRepository.GetAll().Where(f => orderCodes.Contains(f.CO_NUM));

                //var groupItems = await orderDetails.GroupBy(f => f.ITEM_ID).ToListAsync();
                //IList<string> orderItemIds = groupItems.Select(f => f.Key).ToList();
                //var goods = await _productRepository.GetAll().Where(f => orderItemIds.Contains(f.ItemId)).ToListAsync();
                //string sumMonth = DateTime.Now.Year.ToString();
                ////月度
                ////当月
                //if (DateTime.Now.Month < 10)
                //{
                //    sumMonth = sumMonth + "0" + DateTime.Now.Month.ToString();
                //}
                //else
                //{
                //    sumMonth = sumMonth + DateTime.Now.Month.ToString();
                //}
                ////上月
                //string preMonth = DateTime.Now.AddMonths(-1).Year.ToString();
                //if (DateTime.Now.AddMonths(-1).Month < 10)
                //{
                //    preMonth = preMonth + "0" + DateTime.Now.AddMonths(-1).Month.ToString();
                //}
                //else
                //{
                //    preMonth = preMonth + DateTime.Now.AddMonths(-1).Month.ToString();
                //}
                ////季度
                //var nowDate = sumMonth + (DateTime.Now.Day < 10 ? "0" + DateTime.Now.Day.ToString() : DateTime.Now.Day.ToString());
                //var quarterlySpan = GetDate(3);
                ////年度
                //var yearSpan = GetDate(6);
                //foreach (var item in orderItemIds)
                //{
                //    var gd = goods.FirstOrDefault(f => f.ItemId == item);

                //    //上月
                //    var preMonthOrderCoNums = await totalOrders.Where(f => f.POSE_DATE.Contains(preMonth)).Select(f => f.CO_NUM).ToListAsync();
                //    var preMonthOd = await orderDetails.Where(f => f.ITEM_ID == item && preMonthOrderCoNums.Contains(f.CO_NUM)).ToListAsync();
                //    var preMothQty = preMonthOd.Count == 0 ? 0 : preMonthOd.Sum(t => t.QTY_ORD);

                //    //本月
                //    var thisMonthOrderCoNums = await totalOrders.Where(f => f.POSE_DATE.Contains(sumMonth)).Select(f => f.CO_NUM).ToListAsync();
                //    var thisMonthOd = await orderDetails.Where(f => f.ITEM_ID == item && thisMonthOrderCoNums.Contains(f.CO_NUM)).ToListAsync();
                //    var thisMonthQty = thisMonthOd.Count == 0 ? 0 : thisMonthOd.Sum(t => t.QTY_ORD);

                //    //季度  where Convert.ToDateTime(t.Date.Trim()).CompareTo(Convert.ToDateTime("2009/9/9")) >= 0 && Convert.ToDateTime(t.Date.Trim()).CompareTo(Convert.ToDateTime("2009/10/9")) <= 0) 

                //    var quarterlySpanOrderCoNums = await totalOrders.Where(f => f.POSE_DATE.CompareTo(quarterlySpan) >= 0 && f.POSE_DATE.CompareTo(nowDate) <= 0).Select(f => f.CO_NUM).ToListAsync();
                //    var quarterlySpanOd = await orderDetails.Where(f => f.ITEM_ID == item && quarterlySpanOrderCoNums.Contains(f.CO_NUM)).ToListAsync();
                //    var quarterlySpanQty = quarterlySpanOd.Count == 0 ? 0 : quarterlySpanOd.Sum(t => t.QTY_ORD);

                //    //年度
                //    var yearSpanOrderCoNums = await totalOrders.Where(f => f.POSE_DATE.CompareTo(yearSpan) >= 0 && f.POSE_DATE.CompareTo(nowDate) <= 0).Select(f => f.CO_NUM).ToListAsync();
                //    var yearSpanOd = await orderDetails.Where(f => f.ITEM_ID == item && yearSpanOrderCoNums.Contains(f.CO_NUM)).ToListAsync();
                //    var yearSpanQty = yearSpanOd.Count == 0 ? 0 : yearSpanOd.Sum(t => t.QTY_ORD);

                //    RetailAccount book = new RetailAccount
                //    {
                //        BookDate = sumMonth,
                //        PreDate = preMonth,
                //        ItemCode = gd == null ? string.Empty : gd.ItemCode,
                //        ItemName = gd == null ? string.Empty : gd.Specification,
                //        LicenseCode = retail.LicenseKey,
                //        PreMonthQty = preMothQty.Value,
                //        ThsMonthQty = thisMonthQty.Value,
                //        QuarterlyDate = quarterlySpan,
                //        QuarterlyQty = quarterlySpanQty.Value,
                //        YearDate = yearSpan,
                //        YearQty = yearSpanQty.Value
                //    };
                //    if (book.PreMonthQty != 0 || book.ThsMonthQty != 0 || book.QuarterlyQty != 0 || book.YearQty != 0)
                //    {
                //        result.AccountBooks.Add(book);
                //    }
                //}

                #endregion

                #region 新台账
                if (span == 1)
                {
                    result.MonthAccountBooks = await GetRetailAccountDeAsync(tenantId, userId, 2);
                    result.PreMonthAccountBooks = await GetRetailAccountDeAsync(tenantId, userId, 1);
                }
                else if (span == 3)
                {
                    result.AccountBooks = await GetRetailAccountDeAsync(tenantId, userId, 3);
                }
                else if (span == 6)
                {
                    result.AccountBooks = await GetRetailAccountDeAsync(tenantId, userId, 6);
                }
                #endregion

                return result;
            }
        }

        public string GetDate(int span, bool isDay, string sep = "")
        {
            var year = DateTime.Now.AddMonths(-span).Year.ToString();
            if (DateTime.Now.AddMonths(-span).Month < 10)
            {
                if (isDay)
                {
                    return year + "0" + sep + DateTime.Now.AddMonths(-span).Month.ToString() + sep + "01";
                }
                else
                {
                    return year + "0" + sep + DateTime.Now.AddMonths(-span).Month.ToString();
                }
            }
            else
            {
                if (isDay)
                {
                    return year + sep + DateTime.Now.AddMonths(-span).Month.ToString() + sep + "01";
                }
                else
                {
                    return year + sep + DateTime.Now.AddMonths(-span).Month.ToString();
                }
            }
        }

        /// <summary>
        /// 获取台账
        /// </summary>
        /// <param name="retail"></param>
        /// <param name="span">1：上月2：本月，3：季度，6：半年</param>
        /// <returns></returns>
        public async Task<List<RetailAccountDe>> GetRetailAccountDeAsync(int? tenantId, Guid userId, int span)
        {
            using (CurrentUnitOfWork.SetTenantId(tenantId))
            {
                var retail = await _retailerService.GetRetailerByIdDtoByLKeyForWeChatAsync(userId);
                var result = new List<RetailAccountDe>();
                if (retail != null)
                {
                    //当月
                    string sumMonth = GetDate(0, false);
                    //上月
                    string preMonth = GetDate(1, false);
                    //季度
                    var nowDate = sumMonth + (DateTime.Now.Day < 10 ? "0" + DateTime.Now.Day.ToString() : DateTime.Now.Day.ToString());
                    var quarterlySpan = GetDate(2, true);
                    //半年度
                    var yearSpan = GetDate(5, true);
                    var totalOrders = _epcoRepository.GetAll().Where(f => f.CUST_ID == retail.CustId)
                        .WhereIf(span == 1, f => f.POSE_DATE.Contains(preMonth))//上月
                        .WhereIf(span == 2, f => f.POSE_DATE.Contains(sumMonth))//本月
                        .WhereIf(span == 3, f => f.POSE_DATE.CompareTo(quarterlySpan) >= 0 && f.POSE_DATE.CompareTo(nowDate) <= 0)//季度
                        .WhereIf(span == 6, f => f.POSE_DATE.CompareTo(yearSpan) >= 0 && f.POSE_DATE.CompareTo(nowDate) <= 0);//半年

                    //订单号
                    var orderCodes = await totalOrders.Select(t => t.CO_NUM).ToListAsync();

                    //订单下的商品id
                    var orderDetails = _epcolineRepository.GetAll().Where(f => orderCodes.Contains(f.CO_NUM));
                    var groupItems = await orderDetails.GroupBy(f => f.ITEM_ID).ToListAsync();
                    IList<string> orderItemIds = groupItems.Select(f => f.Key).ToList();

                    //根据商品id获取商品信息
                    var goods = await _productRepository.GetAll().Where(f => orderItemIds.Contains(f.ItemId)).ToListAsync();
                    foreach (var item in orderItemIds)
                    {
                        //商品信息
                        var gd = goods.FirstOrDefault(f => f.ItemId == item);

                        //var MonthOrderCoNums = await totalOrders.Select(f => f.CO_NUM).ToListAsync();
                        var MonthOd = await orderDetails.Where(f => f.ITEM_ID == item).ToListAsync();
                        var MonthQty = MonthOd.Count == 0 ? 0 : MonthOd.Sum(t => t.QTY_ORD);
                        RetailAccountDe book = new RetailAccountDe
                        {
                            BookDate = span == 1 ? preMonth : (span == 2 ? sumMonth : (span == 3 ? GetDate(2, false, ".") : (span == 6 ? GetDate(5, false, ".") : ""))),
                            ItemCode = gd == null ? string.Empty : gd.ItemCode,
                            ItemName = gd == null ? string.Empty : gd.Specification,
                            LicenseCode = retail.LicenseKey,
                            MonthQty = MonthQty.Value,
                        };
                        if (book.MonthQty != 0)
                        {
                            result.Add(book);
                        }
                    }
                }
                return result;
            }
        }

        /// <summary>
        /// 获取档级信息
        /// </summary>
        /// <param name="tenantId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        [AbpAllowAnonymous]
        public async Task<RetailInfoDto> GetRetailBasicInfoAsync(int? tenantId, Guid userId)
        {
            using (CurrentUnitOfWork.SetTenantId(tenantId))
            {
                #region  基础信息
                RetailInfoDto retailInfo = new RetailInfoDto();
                var retail = await _retailerService.GetRetailerByIdDtoByLKeyForWeChatAsync(userId);
                if (retail != null)
                {
                    var weChatUser = _wechatuserRepository.GetAll().Where(w => w.BindStatus == BindStatusEnum.已绑定 && w.UserId == retail.Id).FirstOrDefaultAsync().Result;
                    retailInfo.Name = retail.Name;
                    retailInfo.CustId = retail.CustId;
                    retailInfo.Code = retail.Code;
                    retailInfo.BusinessAddress = retail.BusinessAddress;
                    retailInfo.HeadImgUrl = weChatUser != null ? weChatUser.HeadImgUrl : string.Empty;
                    retailInfo.LicenseKey = retail.LicenseKey;
                    retailInfo.OpenId = weChatUser != null ? weChatUser.OpenId : string.Empty;
                    retailInfo.VerificationCode = retail.RetailerVerificationCode;
                    retailInfo.IsShopkeeper = weChatUser != null ? weChatUser.IsShopkeeper : null;
                    //计算月订单金额
                    //当月
                    int currentYear = DateTime.Now.Year;
                    int currentMonth = DateTime.Now.Month;
                    string queryMonth = currentYear.ToString();
                    if (currentMonth < 10)
                    {
                        queryMonth = queryMonth + "0" + currentMonth.ToString();
                    }
                    else
                    {
                        queryMonth = queryMonth + currentMonth.ToString();
                    }
                    //上月
                    int preYear = DateTime.Now.AddMonths(-1).Year;
                    int preOdMonth = DateTime.Now.AddMonths(-1).Month;
                    string queryPreMonth = preYear.ToString();
                    if (preOdMonth < 10)
                    {
                        queryPreMonth = queryPreMonth + "0" + preOdMonth.ToString();
                    }
                    else
                    {
                        queryPreMonth = queryPreMonth + preOdMonth.ToString();
                    }
                    //本月订单统计
                    var mothOrders = _epcoRepository.GetAll().Where(f => f.CUST_ID == retail.CustId && f.POSE_DATE.Contains(queryMonth));
                    var mothcount = await mothOrders.CountAsync();
                    retailInfo.MonthOrderMoney = mothcount == 0 ? 0 : await mothOrders.SumAsync(f => f.AMT_SUM.Value);
                    retailInfo.MonthOrderQty = mothcount == 0 ? 0 : (int)await mothOrders.SumAsync(f => f.QTY_SUM);

                    //上月订单统计
                    var premonthOrders = _epcoRepository.GetAll().Where(f => f.CUST_ID == retail.CustId && f.POSE_DATE.Contains(queryPreMonth));
                    var premothcount = await premonthOrders.CountAsync();
                    retailInfo.PreMonthOrderMoney = premothcount == 0 ? 0 : await premonthOrders.SumAsync(f => f.AMT_SUM.Value);
                    retailInfo.PreMonthOrderQty = premothcount == 0 ? 0 : (int)await premonthOrders.SumAsync(f => f.QTY_SUM.Value);

                    //计算川烟量
                    IList<string> siChuanIds = await _productRepository.GetAll().Where(f => f.MfrId == "20510002").Select(t => t.ItemId).ToListAsync();
                    IList<string> coNums = await mothOrders.Select(f => f.CO_NUM).ToListAsync();
                    var siChuanOrders = _epcolineRepository.GetAll().Where(f => coNums.Contains(f.CO_NUM) && siChuanIds.Contains(f.ITEM_ID));
                    retailInfo.SiChuanQty = await siChuanOrders.CountAsync() == 0 ? 0 : (int)await siChuanOrders.SumAsync(f => f.QTY_ORD.Value);

                    //积分
                    var allPoints = await _gacustpointRepository.GetAll().Where(f => f.LicenseCode == retail.CustId).ToListAsync();//LicenseCode实际指的是CustId（名字取得有误）
                    var totalPoints = allPoints.Count == 0 ? 0 : allPoints.Sum(t => t.Point);
                    int monthPoints = 0;
                    if (allPoints.Count != 0)
                    {
                        var mothPointData = allPoints.SingleOrDefault(t => t.Pmonth == queryMonth);
                        monthPoints = mothPointData == null ? 0 : mothPointData.Point;
                    }
                    //积分暂未获得？
                    retailInfo.TotalPoint = totalPoints;
                    retailInfo.MonthPoint = monthPoints;
                    //档级
                    retailInfo.Level = retail.ArchivalLevel;
                    #region 已达档级
                    var gradLevel = await _gagradeRepository.GetAll().Where(f => f.StartPoint <= monthPoints).OrderByDescending(f => f.StartPoint).FirstOrDefaultAsync();

                    retailInfo.CurrentLevel = gradLevel == null ? "1档" : gradLevel.GradeLevel.ToString() + "档";
                    #endregion

                    //result.BasicInfo = retailInfo;
                    #endregion

                }
                return retailInfo;
            }
        }
    }
}

