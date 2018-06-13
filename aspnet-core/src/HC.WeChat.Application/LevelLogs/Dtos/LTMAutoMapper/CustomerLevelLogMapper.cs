using AutoMapper;

namespace HC.WeChat.LevelLogs.Dtos.LTMAutoMapper
{
    using HC.WeChat.LevelLogs;

    /// <summary>
    /// 配置LevelLog的AutoMapper
    /// </summary>
    internal static class CustomerLevelLogMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <LevelLog, LevelLogDto>();
            configuration.CreateMap<LevelLog, LevelLogListDto>();
            configuration.CreateMap<LevelLogEditDto, LevelLog>();
            // configuration.CreateMap<CreateLevelLogInput, LevelLog>();
            //        configuration.CreateMap<LevelLog, GetLevelLogForEditOutput>();
        }
    }
}