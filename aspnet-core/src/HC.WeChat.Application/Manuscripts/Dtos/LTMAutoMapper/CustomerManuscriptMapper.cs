using AutoMapper;

namespace HC.WeChat.Manuscripts.Dtos.LTMAutoMapper
{
    using HC.WeChat.Manuscripts;

    /// <summary>
    /// 配置Manuscript的AutoMapper
    /// </summary>
    internal static class CustomerManuscriptMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <Manuscript, ManuscriptDto>();
            configuration.CreateMap<Manuscript, ManuscriptListDto>();
            configuration.CreateMap<ManuscriptEditDto, Manuscript>();
            // configuration.CreateMap<CreateManuscriptInput, Manuscript>();
            //        configuration.CreateMap<Manuscript, GetManuscriptForEditOutput>();
        }
    }
}