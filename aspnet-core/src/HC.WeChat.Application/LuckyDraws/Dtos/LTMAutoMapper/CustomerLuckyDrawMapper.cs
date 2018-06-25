using AutoMapper;

namespace HC.WeChat.LuckyDraws.Dtos.LTMAutoMapper
{
    using HC.WeChat.LuckyDraws;

    /// <summary>
    /// 配置LuckyDraw的AutoMapper
    /// </summary>
    internal static class CustomerLuckyDrawMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <LuckyDraw, LuckyDrawDto>();
            configuration.CreateMap<LuckyDraw, LuckyDrawListDto>();
            configuration.CreateMap<LuckyDrawEditDto, LuckyDraw>();
            // configuration.CreateMap<CreateLuckyDrawInput, LuckyDraw>();
            //        configuration.CreateMap<LuckyDraw, GetLuckyDrawForEditOutput>();
        }
    }
}