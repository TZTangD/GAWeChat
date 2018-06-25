using AutoMapper;

namespace HC.WeChat.UserAddresss.Dtos.LTMAutoMapper
{
    using HC.WeChat.UserAddresss;

    /// <summary>
    /// 配置UserAddress的AutoMapper
    /// </summary>
    internal static class CustomerUserAddressMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <UserAddress, UserAddressDto>();
            configuration.CreateMap<UserAddress, UserAddressListDto>();
            configuration.CreateMap<UserAddressEditDto, UserAddress>();
            // configuration.CreateMap<CreateUserAddressInput, UserAddress>();
            //        configuration.CreateMap<UserAddress, GetUserAddressForEditOutput>();
        }
    }
}