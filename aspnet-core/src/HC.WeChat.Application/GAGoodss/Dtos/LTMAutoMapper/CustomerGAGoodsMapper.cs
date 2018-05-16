using AutoMapper;

namespace HC.WeChat.GAGoodss.Dtos.LTMAutoMapper
{
    using HC.WeChat.GAGoodses;

    /// <summary>
    /// 配置GAGoods的AutoMapper
    /// </summary>
    internal static class CustomerGAGoodsMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <GAGoods, GAGoodsDto>();
            configuration.CreateMap<GAGoods, GAGoodsListDto>();
            configuration.CreateMap<GAGoodsEditDto, GAGoods>();
            // configuration.CreateMap<CreateGAGoodsInput, GAGoods>();
            //        configuration.CreateMap<GAGoods, GetGAGoodsForEditOutput>();
        }
    }
}