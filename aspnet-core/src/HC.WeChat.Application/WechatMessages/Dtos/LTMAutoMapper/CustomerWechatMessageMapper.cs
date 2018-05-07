using AutoMapper;

namespace HC.WeChat.WechatMessages.Dtos.LTMAutoMapper
{
    using HC.WeChat.WechatMessages;

    /// <summary>
    /// 配置WechatMessage的AutoMapper
    /// </summary>
    internal static class CustomerWechatMessageMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <WechatMessage, WechatMessageDto>();
            configuration.CreateMap<WechatMessage, WechatMessageListDto>();
            configuration.CreateMap<WechatMessageEditDto, WechatMessage>();
            // configuration.CreateMap<CreateWechatMessageInput, WechatMessage>();
            //        configuration.CreateMap<WechatMessage, GetWechatMessageForEditOutput>();
        }
    }
}