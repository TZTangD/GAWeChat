using AutoMapper;

namespace HC.WeChat.MemberConfigs.Dtos.LTMAutoMapper
{
    using HC.WeChat.MemberConfigs;

    /// <summary>
    /// 配置MemberConfig的AutoMapper
    /// </summary>
    internal static class CustomerMemberConfigMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <MemberConfig, MemberConfigDto>();
            configuration.CreateMap<MemberConfig, MemberConfigListDto>();
            configuration.CreateMap<MemberConfigEditDto, MemberConfig>();
            // configuration.CreateMap<CreateMemberConfigInput, MemberConfig>();
            //        configuration.CreateMap<MemberConfig, GetMemberConfigForEditOutput>();
        }
    }
}