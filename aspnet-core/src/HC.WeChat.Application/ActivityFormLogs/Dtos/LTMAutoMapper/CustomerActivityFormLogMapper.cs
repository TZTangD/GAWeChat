using AutoMapper;

namespace HC.WeChat.ActivityFormLogs.Dtos.LTMAutoMapper
{
    using HC.WeChat.ActivityFormLogs;

    /// <summary>
    /// 配置ActivityFormLog的AutoMapper
    /// </summary>
    internal static class CustomerActivityFormLogMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <ActivityFormLog, ActivityFormLogDto>();
            configuration.CreateMap<ActivityFormLog, ActivityFormLogListDto>();
            configuration.CreateMap<ActivityFormLogEditDto, ActivityFormLog>();
            // configuration.CreateMap<CreateActivityFormLogInput, ActivityFormLog>();
            //        configuration.CreateMap<ActivityFormLog, GetActivityFormLogForEditOutput>();
        }
    }
}