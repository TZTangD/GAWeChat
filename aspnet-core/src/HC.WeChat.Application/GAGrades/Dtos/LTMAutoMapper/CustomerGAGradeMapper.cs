using AutoMapper;

namespace HC.WeChat.GAGrades.Dtos.LTMAutoMapper
{
    using HC.WeChat.GAGrades;

    /// <summary>
    /// 配置GAGrade的AutoMapper
    /// </summary>
    internal static class CustomerGAGradeMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <GAGrade, GAGradeDto>();
            configuration.CreateMap<GAGrade, GAGradeListDto>();
            configuration.CreateMap<GAGradeEditDto, GAGrade>();
            // configuration.CreateMap<CreateGAGradeInput, GAGrade>();
            //        configuration.CreateMap<GAGrade, GetGAGradeForEditOutput>();
        }
    }
}