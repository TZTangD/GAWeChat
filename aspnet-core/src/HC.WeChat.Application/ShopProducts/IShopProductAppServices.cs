using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HC.WeChat.ShopProducts.Dtos;
using HC.WeChat.ShopProducts;
using System;

namespace HC.WeChat.ShopProducts
{
    /// <summary>
    /// ShopProduct应用层服务的接口方法
    /// </summary>
    public interface IShopProductAppService : IApplicationService
    {
        /// <summary>
        /// 获取ShopProduct的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<ShopProductListDto>> GetPagedShopProducts(GetShopProductsInput input);

        /// <summary>
        /// 通过指定id获取ShopProductListDto信息
        /// </summary>
        Task<ShopProductListDto> GetShopProductByIdAsync(EntityDto<Guid> input);

        /// <summary>
        /// 导出ShopProduct为excel表
        /// </summary>
        /// <returns></returns>
        //  Task<FileDto> GetShopProductsToExcel();
        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<GetShopProductForEditOutput> GetShopProductForEdit(NullableIdDto<Guid> input);

        //todo:缺少Dto的生成GetShopProductForEditOutput
        /// <summary>
        /// 添加或者修改ShopProduct的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateOrUpdateShopProduct(CreateOrUpdateShopProductInput input);

        /// <summary>
        /// 删除ShopProduct信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteShopProduct(EntityDto<Guid> input);

        /// <summary>
        /// 批量删除ShopProduct
        /// </summary>
        Task BatchDeleteShopProductsAsync(List<Guid> input);
    }
}
