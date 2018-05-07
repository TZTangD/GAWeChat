using AutoMapper;

namespace HC.WeChat.WeChatUsers.Dtos.LTMAutoMapper
{
    using HC.WeChat.WeChatUsers;

    /// <summary>
    /// 配置WeChatUser的AutoMapper
    /// </summary>
    internal static class CustomerWeChatUserMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <WeChatUser, WeChatUserDto>();
            configuration.CreateMap<WeChatUser, WeChatUserListDto>();
            configuration.CreateMap<WeChatUserEditDto, WeChatUser>();
            // configuration.CreateMap<CreateWeChatUserInput, WeChatUser>();
            //        configuration.CreateMap<WeChatUser, GetWeChatUserForEditOutput>();
        }
    }
}