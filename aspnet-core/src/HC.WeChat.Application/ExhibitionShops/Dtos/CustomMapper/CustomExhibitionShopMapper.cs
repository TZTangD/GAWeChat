using AutoMapper;
using HC.WeChat.ExhibitionShops;

namespace HC.WeChat.ExhibitionShops.Dtos
{

	/// <summary>
	/// 配置ExhibitionShop的AutoMapper
	/// </summary>
	internal static class CustomerExhibitionShopMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap <ExhibitionShop, ExhibitionShopListDto>();
            configuration.CreateMap <ExhibitionShopEditDto, ExhibitionShop>();
        }
    }
}