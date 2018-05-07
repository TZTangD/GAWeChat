using AutoMapper;

namespace HC.WeChat.Activities.Dtos.LTMAutoMapper
{
    using HC.WeChat.Activities;

    /// <summary>
    /// 配置Activity的AutoMapper
    /// </summary>
    internal static class CustomerActivityMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <Activity, ActivityDto>();
            configuration.CreateMap<Activity, ActivityListDto>();
            configuration.CreateMap<ActivityEditDto, Activity>();
            // configuration.CreateMap<CreateActivityInput, Activity>();
            //        configuration.CreateMap<Activity, GetActivityForEditOutput>();
        }
    }
}