using AutoMapper;

namespace HC.WeChat.GoodSources.Dtos.LTMAutoMapper
{
    using HC.WeChat.GoodSources;

    /// <summary>
    /// 配置GoodSource的AutoMapper
    /// </summary>
    internal static class CustomerGoodSourceMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <GoodSource, GoodSourceDto>();
            configuration.CreateMap<GoodSource, GoodSourceListDto>();
            configuration.CreateMap<GoodSourceEditDto, GoodSource>();
            // configuration.CreateMap<CreateGoodSourceInput, GoodSource>();
            //        configuration.CreateMap<GoodSource, GetGoodSourceForEditOutput>();
        }
    }
}