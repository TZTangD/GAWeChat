using AutoMapper;

namespace HC.WeChat.UserAnswers.Dtos.LTMAutoMapper
{
    using HC.WeChat.UserAnswers;

    /// <summary>
    /// 配置UserAnswer的AutoMapper
    /// </summary>
    internal static class CustomerUserAnswerMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <UserAnswer, UserAnswerDto>();
            configuration.CreateMap<UserAnswer, UserAnswerListDto>();
            configuration.CreateMap<UserAnswerEditDto, UserAnswer>();
            // configuration.CreateMap<CreateUserAnswerInput, UserAnswer>();
            //        configuration.CreateMap<UserAnswer, GetUserAnswerForEditOutput>();
        }
    }
}