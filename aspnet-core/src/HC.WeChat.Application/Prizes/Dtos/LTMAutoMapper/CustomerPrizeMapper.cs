using AutoMapper;

namespace HC.WeChat.Prizes.Dtos.LTMAutoMapper
{
    using HC.WeChat.Prizes;

    /// <summary>
    /// 配置Prize的AutoMapper
    /// </summary>
    internal static class CustomerPrizeMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <Prize, PrizeDto>();
            configuration.CreateMap<Prize, PrizeListDto>();
            configuration.CreateMap<PrizeEditDto, Prize>();
            // configuration.CreateMap<CreatePrizeInput, Prize>();
            //        configuration.CreateMap<Prize, GetPrizeForEditOutput>();
        }
    }
}