using AutoMapper;

namespace HC.WeChat.IntegralDetails.Dtos.LTMAutoMapper
{
    using HC.WeChat.IntegralDetails;

    /// <summary>
    /// 配置IntegralDetail的AutoMapper
    /// </summary>
    internal static class CustomerIntegralDetailMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <IntegralDetail, IntegralDetailDto>();
            configuration.CreateMap<IntegralDetail, IntegralDetailListDto>();
            configuration.CreateMap<IntegralDetailEditDto, IntegralDetail>();
            // configuration.CreateMap<CreateIntegralDetailInput, IntegralDetail>();
            //        configuration.CreateMap<IntegralDetail, GetIntegralDetailForEditOutput>();
        }
    }
}