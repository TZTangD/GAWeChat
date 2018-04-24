using AutoMapper;

namespace HC.WeChat.ShopProducts.Dtos.LTMAutoMapper
{
    using HC.WeChat.ShopProducts;

    /// <summary>
    /// 配置ShopProduct的AutoMapper
    /// </summary>
    internal static class CustomerShopProductMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <ShopProduct, ShopProductDto>();
            configuration.CreateMap<ShopProduct, ShopProductListDto>();
            configuration.CreateMap<ShopProductEditDto, ShopProduct>();
            // configuration.CreateMap<CreateShopProductInput, ShopProduct>();
            //        configuration.CreateMap<ShopProduct, GetShopProductForEditOutput>();
        }
    }
}