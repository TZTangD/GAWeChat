using AutoMapper;

namespace HC.WeChat.WeChatGroups.Dtos.LTMAutoMapper
{
    using HC.WeChat.WeChatGroups;

    /// <summary>
    /// 配置WeChatGroup的AutoMapper
    /// </summary>
    internal static class CustomerWeChatGroupMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <WeChatGroup, WeChatGroupDto>();
            configuration.CreateMap<WeChatGroup, WeChatGroupListDto>();
            configuration.CreateMap<WeChatGroupEditDto, WeChatGroup>();
            // configuration.CreateMap<CreateWeChatGroupInput, WeChatGroup>();
            //        configuration.CreateMap<WeChatGroup, GetWeChatGroupForEditOutput>();
        }
    }
}