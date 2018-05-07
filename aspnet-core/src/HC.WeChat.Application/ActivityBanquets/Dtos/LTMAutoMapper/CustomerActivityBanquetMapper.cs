using AutoMapper;

namespace HC.WeChat.ActivityBanquets.Dtos.LTMAutoMapper
{
    using HC.WeChat.ActivityBanquets;

    /// <summary>
    /// 配置ActivityBanquet的AutoMapper
    /// </summary>
    internal static class CustomerActivityBanquetMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <ActivityBanquet, ActivityBanquetDto>();
            configuration.CreateMap<ActivityBanquet, ActivityBanquetListDto>();
            configuration.CreateMap<ActivityBanquetEditDto, ActivityBanquet>();
            // configuration.CreateMap<CreateActivityBanquetInput, ActivityBanquet>();
            //        configuration.CreateMap<ActivityBanquet, GetActivityBanquetForEditOutput>();
        }
    }
}