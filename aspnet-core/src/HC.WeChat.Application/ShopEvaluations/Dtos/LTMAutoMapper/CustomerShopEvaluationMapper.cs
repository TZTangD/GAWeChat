using AutoMapper;

namespace HC.WeChat.ShopEvaluations.Dtos.LTMAutoMapper
{
    using HC.WeChat.ShopEvaluations;

    /// <summary>
    /// 配置ShopEvaluation的AutoMapper
    /// </summary>
    internal static class CustomerShopEvaluationMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <ShopEvaluation, ShopEvaluationDto>();
            configuration.CreateMap<ShopEvaluation, ShopEvaluationListDto>();
            configuration.CreateMap<ShopEvaluationEditDto, ShopEvaluation>();
            // configuration.CreateMap<CreateShopEvaluationInput, ShopEvaluation>();
            //        configuration.CreateMap<ShopEvaluation, GetShopEvaluationForEditOutput>();
        }
    }
}