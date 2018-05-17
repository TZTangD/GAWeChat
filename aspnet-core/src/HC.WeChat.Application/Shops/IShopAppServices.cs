using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HC.WeChat.Shops.Dtos;
using HC.WeChat.Shops;
using System;

namespace HC.WeChat.Shops
{
    /// <summary>
    /// Shop应用层服务的接口方法
    /// </summary>
    public interface IShopAppService : IApplicationService
    {
        /// <summary>
        /// 获取Shop的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<ShopListDto>> GetPagedShops(GetShopsInput input);

        /// <summary>
        /// 通过指定id获取ShopListDto信息
        /// </summary>
        Task<ShopListDto> GetShopByIdAsync(EntityDto<Guid> input);

        /// <summary>
        /// 导出Shop为excel表
        /// </summary>
        /// <returns></returns>
        //  Task<FileDto> GetShopsToExcel();
        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<GetShopForEditOutput> GetShopForEdit(NullableIdDto<Guid> input);

        //todo:缺少Dto的生成GetShopForEditOutput
        /// <summary>
        /// 添加或者修改Shop的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateOrUpdateShop(CreateOrUpdateShopInput input);

        /// <summary>
        /// 删除Shop信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteShop(EntityDto<Guid> input);

        /// <summary>
        /// 批量删除Shop
        /// </summary>
        Task BatchDeleteShopsAsync(List<Guid> input);

        /// <summary>
        /// 添加或者修改Shop的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateOrUpdateShopDto(ShopEditDto input);

        /// <summary>
        /// 获取Shop的分页列表信息(连接零售客户表)
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<ShopListDto>> GetPagedShopsByRetailer(GetShopsInput input);

        /// <summary>
        /// 获取单个店铺信息（连接零售客户表）
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<ShopListDto> GetShopByIdRetailerAsync(Guid? input);
        /// 微信端保存和添加店铺
        /// </summary>
        Task WechatCreateOrUpdateShop(CreateOrUpdateShopInput input);

        /// <summary>
        /// 通过微信用户获取店铺信息
        /// </summary>
        Task<ShopListDto> GetShopByOpenId(int? tenantId, string openId);

        /// <summary>
        /// 店铺审核
        /// </summary>
        /// <param name="id"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        Task CheckShop(CheckShopDto input);
        
        Task<ShopListDto> GetViewShopByIdAsync(Guid id, int? tenantId);

        Task<List<NearbyShopDto>> GetNearbyShopByLocationAsync(decimal latitude, decimal longitude, int? tenantId, string openId);

        Task<List<ShopListDto>> GetShopListByGoodsIdAsync(int? tenantId, Guid goodsId);
    }
}
