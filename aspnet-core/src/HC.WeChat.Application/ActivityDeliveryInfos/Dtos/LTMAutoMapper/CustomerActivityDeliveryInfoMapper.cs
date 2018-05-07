using AutoMapper;

namespace HC.WeChat.ActivityDeliveryInfos.Dtos.LTMAutoMapper
{
    using HC.WeChat.ActivityDeliveryInfos;

    /// <summary>
    /// 配置ActivityDeliveryInfo的AutoMapper
    /// </summary>
    internal static class CustomerActivityDeliveryInfoMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <ActivityDeliveryInfo, ActivityDeliveryInfoDto>();
            configuration.CreateMap<ActivityDeliveryInfo, ActivityDeliveryInfoListDto>();
            configuration.CreateMap<ActivityDeliveryInfoEditDto, ActivityDeliveryInfo>();
            // configuration.CreateMap<CreateActivityDeliveryInfoInput, ActivityDeliveryInfo>();
            //        configuration.CreateMap<ActivityDeliveryInfo, GetActivityDeliveryInfoForEditOutput>();
        }
    }
}