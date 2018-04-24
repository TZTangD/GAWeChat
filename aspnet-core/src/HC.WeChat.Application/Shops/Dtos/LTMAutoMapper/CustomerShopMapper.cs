using AutoMapper;

namespace HC.WeChat.Shops.Dtos.LTMAutoMapper
{
    using HC.WeChat.Shops;

    /// <summary>
    /// 配置Shop的AutoMapper
    /// </summary>
    internal static class CustomerShopMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <Shop, ShopDto>();
            configuration.CreateMap<Shop, ShopListDto>();
            configuration.CreateMap<ShopEditDto, Shop>();
            // configuration.CreateMap<CreateShopInput, Shop>();
            //        configuration.CreateMap<Shop, GetShopForEditOutput>();
        }
    }
}