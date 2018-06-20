using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;

using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using HC.WeChat.PurchaseRecords.Authorization;
using HC.WeChat.PurchaseRecords.Dtos;
using HC.WeChat.PurchaseRecords.DomainServices;
using HC.WeChat.PurchaseRecords;
using System;
using System.Linq;
using HC.WeChat.Authorization;
using HC.WeChat.Dto;
using HC.WeChat.IntegralDetails;
using HC.WeChat.WeChatUsers;
using HC.WeChat.MemberConfigs;
using HC.WeChat.WechatEnums;
using HC.WeChat.Shops;
using HC.WeChat.Products;
using HC.WeChat.Products.Dtos;
using HC.WeChat.ShopEvaluations;
using HC.WeChat.WechatAppConfigs;
using HC.WeChat.WechatAppConfigs.Dtos;
using Senparc.Weixin.MP.AdvancedAPIs;
using Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;
using HC.WeChat.StatisticalDetails;
using HC.WeChat.StatisticalDetails.Dtos;

namespace HC.WeChat.PurchaseRecords
{
    /// <summary>
    /// PurchaseRecord应用层服务的接口实现方法
    /// </summary>
    //[AbpAuthorize(PurchaseRecordAppPermissions.PurchaseRecord)]
    [AbpAuthorize(AppPermissions.Pages)]
    public class PurchaseRecordAppService : WeChatAppServiceBase, IPurchaseRecordAppService
    {
        private readonly IRepository<PurchaseRecord, Guid> _purchaserecordRepository;
        private readonly IRepository<IntegralDetail, Guid> _integralDetailRepository;
        private readonly IRepository<WeChatUser, Guid> _weChatUserRepository;
        private readonly IRepository<Product, Guid> _productRepository;
        private readonly IRepository<MemberConfig, Guid> _memberConfigRepository;
        private readonly IRepository<ShopEvaluation, Guid> _shopevaluationRepository;
        private readonly IRepository<Shop, Guid> _shopRepository;
        private readonly IRepository<StatisticalDetail, Guid> _statisticaldetailRepository;
        private readonly IPurchaseRecordManager _purchaserecordManager;
        private readonly IConfigurationRoot _appConfiguration;
        private readonly IRepository<WechatAppConfig, int> _wechatappconfigRepository;

        IWechatAppConfigAppService _wechatAppConfigAppService;
        private int? TenantId { get; set; }
        private WechatAppConfigInfo AppConfig { get; set; }
        /// <summary>
        /// 构造函数
        /// </summary>
        public PurchaseRecordAppService(IRepository<PurchaseRecord, Guid> purchaserecordRepository
        , IRepository<IntegralDetail, Guid> integralDetailRepository
        , IRepository<WeChatUser, Guid> weChatUserRepository
        , IRepository<MemberConfig, Guid> memberConfigRepository
        , IRepository<Shop, Guid> shopRepository
         , IRepository<Product, Guid> productRepository
        , IPurchaseRecordManager purchaserecordManager
            , IRepository<ShopEvaluation, Guid> shopevaluationRepository
                    , IWechatAppConfigAppService wechatAppConfigAppService
            , IRepository<WechatAppConfig, int> wechatappconfigRepository
            , IRepository<StatisticalDetail, Guid> statisticaldetailRepository
        )
        {
            _purchaserecordRepository = purchaserecordRepository;
            _integralDetailRepository = integralDetailRepository;
            _weChatUserRepository = weChatUserRepository;
            _memberConfigRepository = memberConfigRepository;
            _shopRepository = shopRepository;
            _productRepository = productRepository;
            _purchaserecordManager = purchaserecordManager;
            _shopevaluationRepository = shopevaluationRepository;
            _wechatAppConfigAppService = wechatAppConfigAppService;
            TenantId = null;
            AppConfig = _wechatAppConfigAppService.GetWechatAppConfig(TenantId).Result;
            _wechatappconfigRepository = wechatappconfigRepository;
            _statisticaldetailRepository = statisticaldetailRepository;
        }

        /// <summary>
        /// 获取PurchaseRecord的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<PurchaseRecordListDto>> GetPagedPurchaseRecords(GetPurchaseRecordsInput input)
        {

            var query = _purchaserecordRepository.GetAll();
            //TODO:根据传入的参数添加过滤条件
            var purchaserecordCount = await query.CountAsync();

            var purchaserecords = await query
                .OrderBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();

            //var purchaserecordListDtos = ObjectMapper.Map<List <PurchaseRecordListDto>>(purchaserecords);
            var purchaserecordListDtos = purchaserecords.MapTo<List<PurchaseRecordListDto>>();

            return new PagedResultDto<PurchaseRecordListDto>(
                purchaserecordCount,
                purchaserecordListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取PurchaseRecordListDto信息
        /// </summary>
        public async Task<PurchaseRecordListDto> GetPurchaseRecordByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _purchaserecordRepository.GetAsync(input.Id);

            return entity.MapTo<PurchaseRecordListDto>();
        }

        /// <summary>
        /// 导出PurchaseRecord为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetPurchaseRecordsToExcel(){
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
        public async Task<GetPurchaseRecordForEditOutput> GetPurchaseRecordForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetPurchaseRecordForEditOutput();
            PurchaseRecordEditDto purchaserecordEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _purchaserecordRepository.GetAsync(input.Id.Value);

                purchaserecordEditDto = entity.MapTo<PurchaseRecordEditDto>();

                //purchaserecordEditDto = ObjectMapper.Map<List <purchaserecordEditDto>>(entity);
            }
            else
            {
                purchaserecordEditDto = new PurchaseRecordEditDto();
            }

            output.PurchaseRecord = purchaserecordEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改PurchaseRecord的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdatePurchaseRecord(CreateOrUpdatePurchaseRecordInput input)
        {

            if (input.PurchaseRecord.Id.HasValue)
            {
                await UpdatePurchaseRecordAsync(input.PurchaseRecord);
            }
            else
            {
                await CreatePurchaseRecordAsync(input.PurchaseRecord);
            }
        }

        /// <summary>
        /// 新增PurchaseRecord
        /// </summary>
        //[AbpAuthorize(PurchaseRecordAppPermissions.PurchaseRecord_CreatePurchaseRecord)]
        protected virtual async Task<PurchaseRecordEditDto> CreatePurchaseRecordAsync(PurchaseRecordEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<PurchaseRecord>(input);

            entity = await _purchaserecordRepository.InsertAsync(entity);
            return entity.MapTo<PurchaseRecordEditDto>();
        }

        /// <summary>
        /// 编辑PurchaseRecord
        /// </summary>
        //[AbpAuthorize(PurchaseRecordAppPermissions.PurchaseRecord_EditPurchaseRecord)]
        protected virtual async Task UpdatePurchaseRecordAsync(PurchaseRecordEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _purchaserecordRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            await _purchaserecordRepository.UpdateAsync(entity);
        }

        /// <summary>
        /// 删除PurchaseRecord信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        //[AbpAuthorize(PurchaseRecordAppPermissions.PurchaseRecord_DeletePurchaseRecord)]
        public async Task DeletePurchaseRecord(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _purchaserecordRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除PurchaseRecord的方法
        /// </summary>
        //[AbpAuthorize(PurchaseRecordAppPermissions.PurchaseRecord_BatchDeletePurchaseRecords)]
        public async Task BatchDeletePurchaseRecordsAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _purchaserecordRepository.DeleteAsync(s => input.Contains(s.Id));
        }

        /// <summary>
        /// 获取指定用户购买记录的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<PurchaseRecordListDto>> GetPagedPurchaseRecordsByIdAsync(GetPurchaseRecordsInput input)
        {

            var query = _purchaserecordRepository.GetAll().Where(v => v.OpenId == input.OpenId);
            var result = from p in query
                         select
                                new PurchaseRecordListDto()
                                {
                                    Specification = p.Specification,
                                    CreationTime = p.CreationTime,
                                    Integral = p.Integral,
                                    Remark = p.Remark,
                                    ShopName = p.ShopName,
                                    Quantity = p.Quantity
                                };
            //TODO:根据传入的参数添加过滤条件
            var purchaserecordCount = await result.CountAsync();

            var purchaserecords = await result
                .OrderByDescending(v=>v.CreationTime)
                .PageBy(input)
                .ToListAsync();
            var purchaserecordListDtos = purchaserecords.MapTo<List<PurchaseRecordListDto>>();
            return new PagedResultDto<PurchaseRecordListDto>(
                purchaserecordCount,
                purchaserecordListDtos
                );
        }

        private async Task<Dictionary<DeployCodeEnum?, decimal>> GetIntegralConfig(int? tenantId)
        {
            using (CurrentUnitOfWork.SetTenantId(tenantId))
            {
                //获取积分配置
                var configList = await _memberConfigRepository.GetAll().Where(c => c.Type == DeployTypeEnum.积分配置).ToListAsync();
                if (!configList.Exists(c => c.Code == DeployCodeEnum.商品评价))
                {
                    configList.Add(new MemberConfig()
                    {
                        Code = DeployCodeEnum.商品评价,
                        Value = "5"
                    });
                }
                if (!configList.Exists(c => c.Code == DeployCodeEnum.商品购买))
                {
                    configList.Add(new MemberConfig()
                    {
                        Code = DeployCodeEnum.商品购买,
                        Value = "1"
                    });
                }
                if (!configList.Exists(c => c.Code == DeployCodeEnum.店铺扫码兑换))
                {
                    configList.Add(new MemberConfig()
                    {
                        Code = DeployCodeEnum.店铺扫码兑换,
                        Value = "0.5"
                    });
                }
                return configList.ToDictionary(key => key.Code,
                    value =>
                    {
                        decimal v = 0;
                        if (!decimal.TryParse(value.Value, out v))
                        {
                            switch (value.Code)
                            {
                                case DeployCodeEnum.商品评价:
                                    {
                                        v = 5;
                                    }
                                    break;
                                case DeployCodeEnum.商品购买:
                                    {
                                        v = 1;
                                    }
                                    break;
                                case DeployCodeEnum.店铺扫码兑换:
                                    {
                                        v = 0.5M;
                                    }
                                    break;
                            }
                        }
                        return v;
                    });
            }
        }

        [AbpAllowAnonymous]
        public async Task<APIResultDto> ExchangeIntegralAsync(ExchangeIntegralDto input)
        {
            using (CurrentUnitOfWork.SetTenantId(input.TenantId))
            {
                //获取积分配置
                var config = await GetIntegralConfig(input.TenantId);

                int? xintegral = 0;//消费者获得积分
                int? rintegral = 0;//零售客户获得积分
                string refIds = string.Empty;
                foreach (var item in input.ShopProductList)
                {
                    //购买记录
                    var purchaseRecord = input.MapTo<PurchaseRecord>();
                    purchaseRecord.Integral = (int)(item.Price * item.Num * config[DeployCodeEnum.商品购买]);
                    purchaseRecord.Quantity = item.Num;
                    purchaseRecord.ProductId = item.Id;
                    purchaseRecord.Specification = item.Specification;
                    purchaseRecord.Remark = string.Format("数量{0}*指导零售价{1}*兑换比例{2}=积分{3}", item.Num, item.Price, config[DeployCodeEnum.商品购买], purchaseRecord.Integral);
                    await _purchaserecordRepository.InsertAsync(purchaseRecord);
                    await CurrentUnitOfWork.SaveChangesAsync();

                    refIds += purchaseRecord.Id.ToString() + ",";
                    xintegral += purchaseRecord.Integral;
                    rintegral += ((int)(item.Price * item.Num * config[DeployCodeEnum.店铺扫码兑换]));
                }
                if (refIds.Length > 0)
                {
                    refIds = refIds.Substring(0, refIds.Length - 1);
                }
                //更新消费者总积分 和 积分明细
                if (xintegral > 0)
                {
                    var user = await _weChatUserRepository.GetAll().Where(u => u.OpenId == input.OpenId).FirstOrDefaultAsync();
                    var intDetail = new IntegralDetail();
                    intDetail.InitialIntegral = user.IntegralTotal;
                    intDetail.Integral = xintegral;
                    intDetail.FinalIntegral = user.IntegralTotal + xintegral;
                    intDetail.OpenId = user.OpenId;
                    intDetail.RefId = refIds;
                    intDetail.TenantId = input.TenantId;
                    intDetail.Type = IntegralTypeEnum.购买商品兑换;
                    intDetail.Desc = "店铺购买商品兑换";
                    await _integralDetailRepository.InsertAsync(intDetail);
                    //await CurrentUnitOfWork.SaveChangesAsync();
                    user.IntegralTotal = intDetail.FinalIntegral.Value;
                    await _weChatUserRepository.UpdateAsync(user);
                    //发送微信模板通知-消费者
                    await PurchaseSendWXMesssageToCust(user.OpenId, input.host, user.MemberBarCode, intDetail.FinalIntegral, intDetail.Integral);
                }

                //更新店铺管理员总积分 和 积分明细
                if (rintegral > 0)
                {
                    //获取零售客户 店铺管理员
                    var shopKeeper = await _weChatUserRepository.GetAll().Where(w => w.UserId == input.RetailerId
                    && w.UserType == UserTypeEnum.零售客户 && w.IsShopkeeper == true).FirstOrDefaultAsync();
                    if (shopKeeper != null)
                    {
                        var intDetail = new IntegralDetail();
                        intDetail.InitialIntegral = shopKeeper.IntegralTotal;
                        intDetail.Integral = rintegral;
                        intDetail.FinalIntegral = shopKeeper.IntegralTotal + rintegral;
                        intDetail.OpenId = shopKeeper.OpenId;
                        intDetail.RefId = refIds;
                        intDetail.TenantId = input.TenantId;
                        intDetail.Type = IntegralTypeEnum.扫码积分赠送;
                        intDetail.Desc = "店铺消费者购买商品赠送";
                        await _integralDetailRepository.InsertAsync(intDetail);
                        shopKeeper.IntegralTotal = intDetail.FinalIntegral.Value;
                        await _weChatUserRepository.UpdateAsync(shopKeeper);
                        //发送微信模板通知-店铺管理员
                        await PurchaseSendWXMesssageToShopKeeper(shopKeeper.OpenId, input.host, shopKeeper.MemberBarCode, intDetail.FinalIntegral, intDetail.Integral);
                    }
                }


                //更新店铺销量
                var shop = await _shopRepository.GetAsync(input.ShopId.Value);
                shop.ReadTotal++;//人气增加
                await AddSingleTotalAsync(input.OpenId, input.ShopId); // 店铺人气查重改写
                shop.SaleTotal++;//销量增加
                await _shopRepository.UpdateAsync(shop);

                //发送积分微信通知

                APIResultDto result = new APIResultDto();
                result.Code = 0;
                result.Msg = "积分兑换成功";
                result.Data = new { RetailerIntegral = rintegral, UserIntegral = xintegral };
                return result;
            }
        }

        /// <summary>
        /// 店铺人气排重
        /// </summary>
        /// <param name="openId"></param>
        /// <param name="shopId"></param>
        /// <returns></returns>
        private async Task AddSingleTotalAsync(string openId,Guid ?shopId)
        {
            try
            {
                StatisticalDetailEditDto input = new StatisticalDetailEditDto();
                input.OpenId = openId;
                input.Type = CountTypeEnum.店铺人气;
                input.ArticleId = Guid.Parse(Convert.ToString(shopId));
                var result = input.MapTo<StatisticalDetail>();
                var readCount = await _statisticaldetailRepository.GetAll().Where(v => v.OpenId == input.OpenId && v.ArticleId == input.ArticleId && v.Type == CountTypeEnum.店铺人气).CountAsync();
                if (readCount == 0)
                {
                    await _statisticaldetailRepository.InsertAsync(result);
                    var shop = await _shopRepository.GetAll().Where(v => v.Id == input.ArticleId).FirstOrDefaultAsync();
                    if (shop.SingleTotal == null)
                    {
                        shop.SingleTotal = 0;
                    }
                    shop.SingleTotal++;
                    var shopInfoUpdate = await _shopRepository.UpdateAsync(shop);
                }
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat("店铺人气增加失败 error：{0} Exception：{1}", ex.Message, ex);
            }

        }
        /// <summary>
        /// 发送微信模板通知-消费者
        /// </summary>
        /// <param name="OpenId"></param>
        /// <param name="host"></param>
        /// <param name="memberBarCode"></param>
        /// <param name="finalIntegral"></param>
        /// <param name="integral"></param>
        /// <returns></returns>
        private async Task PurchaseSendWXMesssageToCust(string OpenId, string host, string memberBarCode, int? finalIntegral, int? integral)
        {
            try
            {
                string templateId = await _wechatappconfigRepository.GetAll().Select(v => v.TemplateIds).FirstOrDefaultAsync();
                if (templateId != null || templateId.Length != 0)
                {
                    string[] ids = templateId.Split(',');
                    //发送微信模板通知-消费者
                    string appId = AppConfig.AppId;
                    string openId = OpenId;
                    host = host ?? "http://ga.intcov.com";//host配置
                    //string templateId = "3Dgkz89yi8e0jXtwBUhdMSgHeZwPvHi2gz8WrD-CUA4";//模版id  
                    string url = host + "/GAWX/Authorization?page=301";
                    object data = new
                    {
                        keyword1 = new TemplateDataItem(memberBarCode.ToString()),
                        keyword2 = new TemplateDataItem(finalIntegral.ToString() + "积分"),
                        keyword3 = new TemplateDataItem(integral.ToString() + "积分"),
                        keyword4 = new TemplateDataItem(DateTime.Now.ToString("yyyy-MM-dd HH:mm"))
                    };
                    await TemplateApi.SendTemplateMessageAsync(appId, openId, ids[0], url, data);
                }
            }
            catch (Exception ex)
            {

                Logger.ErrorFormat("消费者发送消息通知失败 error：{0} Exception：{1}", ex.Message, ex);
            }
        }

        private async Task PurchaseSendWXMesssageToShopKeeper(string OpenId, string host, string memberBarCode, int? finalIntegral, int? integral)
        {
            try
            {
                string templateId = await _wechatappconfigRepository.GetAll().Select(v => v.TemplateIds).FirstOrDefaultAsync();
                if (templateId != null || templateId.Length != 0)
                {
                    string[] ids = templateId.Split(',');
                    //发送微信模板通知-店铺管理员
                    string appId = AppConfig.AppId;
                    string openId = OpenId;
                    //string templateId = "3Dgkz89yi8e0jXtwBUhdMSgHeZwPvHi2gz8WrD-CUA4";//模版id  
                    host = host ?? "http://ga.intcov.com";//host配置
                    string url = host + "/GAWX/Authorization?page=301";
                    object data = new
                    {
                        keyword1 = new TemplateDataItem(memberBarCode.ToString()),
                        keyword2 = new TemplateDataItem(finalIntegral.ToString() + "积分"),
                        keyword3 = new TemplateDataItem(integral.ToString() + "积分"),
                        keyword4 = new TemplateDataItem(DateTime.Now.ToString("yyyy-MM-dd HH:mm"))
                    };
                    await TemplateApi.SendTemplateMessageAsync(appId, openId, ids[0], url, data);
                }
            }
            catch (Exception ex)
            {

                Logger.ErrorFormat("店铺管理员发送消息通知失败 error：{0} Exception：{1}", ex.Message, ex);
            }
        }

        /// <summary>
        /// 购买记录(暂不分页处理)
        /// </summary>
        /// <param name="tenantId"></param>
        /// <param name="openId"></param>
        /// <returns></returns>
        [AbpAllowAnonymous]
        public async Task<List<PurchaseRecordListDto>> GetWXPagedPurchaseRecordAsync(int? tenantId, string openId)
        {
            using (CurrentUnitOfWork.SetTenantId(tenantId))
            {
                var query = _purchaserecordRepository.GetAll().Where(p => p.OpenId == openId);
                var records = from pr in query
                              select new PurchaseRecordListDto()
                              {
                                  Id = pr.Id,
                                  CreationTime = pr.CreationTime,
                                  OpenId = pr.OpenId,
                                  ShopName = pr.ShopName,
                                  Specification = pr.Specification,
                                  Quantity = pr.Quantity,
                                  ProductId = pr.ProductId,
                                  IsEvaluation = pr.IsEvaluation
                              };
                //var z = records.ToList();
                var products = from p in _productRepository.GetAll()
                               select new ProductListDto()
                               {
                                   Id = p.Id,
                                   PhotoUrl = p.PhotoUrl
                               };
                //var y = products.ToList();
                var entity = from pr in records
                             join p in products on pr.ProductId equals p.Id
                             select new PurchaseRecordListDto()
                             {
                                 Id = pr.Id,
                                 CreationTime = pr.CreationTime,
                                 OpenId = pr.OpenId,
                                 ShopName = pr.ShopName,
                                 Specification = pr.Specification,
                                 Quantity = pr.Quantity,
                                 ProductId = pr.ProductId,
                                 PhotoUrl = p.PhotoUrl,
                                 IsEvaluation = pr.IsEvaluation
                             };
                //var x = entity.ToList();
                return await entity.OrderByDescending(v => v.CreationTime).ToListAsync();
            }
        }

        /// <summary>
        /// 根据openId查询购买记录
        /// </summary>
        /// <param name="tenantId"></param>
        /// <param name="openId"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        //[AbpAllowAnonymous]
        //public async Task<List<PurchaseRecordListDto>> GetWXPagedPurchaseRecordAsync(int? tenantId, string openId, int pageIndex, int pageSize)
        //{
        //    using (CurrentUnitOfWork.SetTenantId(tenantId))
        //    {
        //        var query = _purchaserecordRepository.GetAll().Where(p => p.OpenId == openId);
        //        var records = from pr in query
        //                      select new PurchaseRecordListDto()
        //                      {
        //                          Id = pr.Id,
        //                          CreationTime = pr.CreationTime,
        //                          OpenId = pr.OpenId,
        //                          ShopName = pr.ShopName,
        //                          Specification = pr.Specification,
        //                          Quantity = pr.Quantity,
        //                          ProductId = pr.ProductId,
        //                          IsEvaluation = pr.IsEvaluation
        //                      };
        //        //var z = records.ToList();
        //        var products = from p in _productRepository.GetAll()
        //                       select new ProductListDto()
        //                       {
        //                           Id = p.Id,
        //                           PhotoUrl = p.PhotoUrl
        //                       };
        //        //var y = products.ToList();
        //        var entity = from pr in records
        //                     join p in products on pr.ProductId equals p.Id
        //                     select new PurchaseRecordListDto()
        //                     {
        //                         Id = pr.Id,
        //                         CreationTime = pr.CreationTime,
        //                         OpenId = pr.OpenId,
        //                         ShopName = pr.ShopName,
        //                         Specification = pr.Specification,
        //                         Quantity = pr.Quantity,
        //                         ProductId = pr.ProductId,
        //                         PhotoUrl = p.PhotoUrl,
        //                         IsEvaluation = pr.IsEvaluation
        //                     };
        //        //var x = entity.ToList();
        //        return await entity.OrderByDescending(v => v.CreationTime).Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
        //    }
        //}
    }
}

