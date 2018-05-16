using AutoMapper;

namespace HC.WeChat.GACustPoints.Dtos.LTMAutoMapper
{
    using HC.WeChat.GACustPoints;

    /// <summary>
    /// 配置GACustPoint的AutoMapper
    /// </summary>
    internal static class CustomerGACustPointMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <GACustPoint, GACustPointDto>();
            configuration.CreateMap<GACustPoint, GACustPointListDto>();
            configuration.CreateMap<GACustPointEditDto, GACustPoint>();
            // configuration.CreateMap<CreateGACustPointInput, GACustPoint>();
            //        configuration.CreateMap<GACustPoint, GetGACustPointForEditOutput>();
        }
    }
}