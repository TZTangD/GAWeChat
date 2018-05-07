using AutoMapper;

namespace HC.WeChat.Advises.Dtos.LTMAutoMapper
{
    using HC.WeChat.Advises;

    /// <summary>
    /// 配置Advise的AutoMapper
    /// </summary>
    internal static class CustomerAdviseMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <Advise, AdviseDto>();
            configuration.CreateMap<Advise, AdviseListDto>();
            configuration.CreateMap<AdviseEditDto, Advise>();
            // configuration.CreateMap<CreateAdviseInput, Advise>();
            //        configuration.CreateMap<Advise, GetAdviseForEditOutput>();
        }
    }
}