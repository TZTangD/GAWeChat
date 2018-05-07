using AutoMapper;

namespace HC.WeChat.WechatSubscribes.Dtos.LTMAutoMapper
{
    using HC.WeChat.WechatSubscribes;

    /// <summary>
    /// 配置WechatSubscribe的AutoMapper
    /// </summary>
    internal static class CustomerWechatSubscribeMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <WechatSubscribe, WechatSubscribeDto>();
            configuration.CreateMap<WechatSubscribe, WechatSubscribeListDto>();
            configuration.CreateMap<WechatSubscribeEditDto, WechatSubscribe>();
            // configuration.CreateMap<CreateWechatSubscribeInput, WechatSubscribe>();
            //        configuration.CreateMap<WechatSubscribe, GetWechatSubscribeForEditOutput>();
        }
    }
}