using AutoMapper;

namespace HC.WeChat.StatisticalDetails.Dtos.LTMAutoMapper
{
    using HC.WeChat.StatisticalDetails;

    /// <summary>
    /// 配置StatisticalDetail的AutoMapper
    /// </summary>
    internal static class CustomerStatisticalDetailMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <StatisticalDetail, StatisticalDetailDto>();
            configuration.CreateMap<StatisticalDetail, StatisticalDetailListDto>();
            configuration.CreateMap<StatisticalDetailEditDto, StatisticalDetail>();
            // configuration.CreateMap<CreateStatisticalDetailInput, StatisticalDetail>();
            //        configuration.CreateMap<StatisticalDetail, GetStatisticalDetailForEditOutput>();
        }
    }
}