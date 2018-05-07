using AutoMapper;

namespace HC.WeChat.UserQuestions.Dtos.LTMAutoMapper
{
    using HC.WeChat.UserQuestions;

    /// <summary>
    /// 配置UserQuestion的AutoMapper
    /// </summary>
    internal static class CustomerUserQuestionMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <UserQuestion, UserQuestionDto>();
            configuration.CreateMap<UserQuestion, UserQuestionListDto>();
            configuration.CreateMap<UserQuestionEditDto, UserQuestion>();
            // configuration.CreateMap<CreateUserQuestionInput, UserQuestion>();
            //        configuration.CreateMap<UserQuestion, GetUserQuestionForEditOutput>();
        }
    }
}