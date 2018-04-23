using AutoMapper;

namespace HC.WeChat.ActivityForms.Dtos.LTMAutoMapper
{
    using HC.WeChat.ActivityForms;

    /// <summary>
    /// 配置ActivityForm的AutoMapper
    /// </summary>
    internal static class CustomerActivityFormMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <ActivityForm, ActivityFormDto>();
            configuration.CreateMap<ActivityForm, ActivityFormListDto>();
            configuration.CreateMap<ActivityFormEditDto, ActivityForm>();
            // configuration.CreateMap<CreateActivityFormInput, ActivityForm>();
            //        configuration.CreateMap<ActivityForm, GetActivityFormForEditOutput>();
        }
    }
}