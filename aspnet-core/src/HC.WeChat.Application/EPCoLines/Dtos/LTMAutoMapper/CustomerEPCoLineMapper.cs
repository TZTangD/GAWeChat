using AutoMapper;

namespace HC.WeChat.EPCoLines.Dtos.LTMAutoMapper
{
    using HC.WeChat.EPCoLines;

    /// <summary>
    /// 配置EPCoLine的AutoMapper
    /// </summary>
    internal static class CustomerEPCoLineMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <EPCoLine, EPCoLineDto>();
            configuration.CreateMap<EPCoLine, EPCoLineListDto>();
            configuration.CreateMap<EPCoLineEditDto, EPCoLine>();
            // configuration.CreateMap<CreateEPCoLineInput, EPCoLine>();
            //        configuration.CreateMap<EPCoLine, GetEPCoLineForEditOutput>();
        }
    }
}