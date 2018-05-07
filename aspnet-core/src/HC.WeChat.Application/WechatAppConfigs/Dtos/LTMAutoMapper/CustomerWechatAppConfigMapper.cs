using AutoMapper;

namespace HC.WeChat.WechatAppConfigs.Dtos.LTMAutoMapper
{
    using HC.WeChat.WechatAppConfigs;

    /// <summary>
    /// 配置WechatAppConfig的AutoMapper
    /// </summary>
    internal static class CustomerWechatAppConfigMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <WechatAppConfig, WechatAppConfigDto>();
            configuration.CreateMap<WechatAppConfig, WechatAppConfigListDto>();
            configuration.CreateMap<WechatAppConfigEditDto, WechatAppConfig>();
            // configuration.CreateMap<CreateWechatAppConfigInput, WechatAppConfig>();
            //        configuration.CreateMap<WechatAppConfig, GetWechatAppConfigForEditOutput>();
        }
    }
}