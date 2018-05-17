using AutoMapper;

namespace HC.WeChat.EPCos.Dtos.LTMAutoMapper
{
    using HC.WeChat.EPCos;

    /// <summary>
    /// 配置EPCo的AutoMapper
    /// </summary>
    internal static class CustomerEPCoMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <EPCo, EPCoDto>();
            configuration.CreateMap<EPCo, EPCoListDto>();
            configuration.CreateMap<EPCoEditDto, EPCo>();
            // configuration.CreateMap<CreateEPCoInput, EPCo>();
            //        configuration.CreateMap<EPCo, GetEPCoForEditOutput>();
        }
    }
}