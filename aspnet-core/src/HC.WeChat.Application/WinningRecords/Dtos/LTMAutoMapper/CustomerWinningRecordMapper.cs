using AutoMapper;

namespace HC.WeChat.WinningRecords.Dtos.LTMAutoMapper
{
    using HC.WeChat.WinningRecords;

    /// <summary>
    /// 配置WinningRecord的AutoMapper
    /// </summary>
    internal static class CustomerWinningRecordMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <WinningRecord, WinningRecordDto>();
            configuration.CreateMap<WinningRecord, WinningRecordListDto>();
            configuration.CreateMap<WinningRecordEditDto, WinningRecord>();
            // configuration.CreateMap<CreateWinningRecordInput, WinningRecord>();
            //        configuration.CreateMap<WinningRecord, GetWinningRecordForEditOutput>();
        }
    }
}