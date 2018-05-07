using AutoMapper;

namespace HC.WeChat.PurchaseRecords.Dtos.LTMAutoMapper
{
    using HC.WeChat.PurchaseRecords;

    /// <summary>
    /// 配置PurchaseRecord的AutoMapper
    /// </summary>
    internal static class CustomerPurchaseRecordMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <PurchaseRecord, PurchaseRecordDto>();
            configuration.CreateMap<PurchaseRecord, PurchaseRecordListDto>();
            configuration.CreateMap<PurchaseRecordEditDto, PurchaseRecord>();
            // configuration.CreateMap<CreatePurchaseRecordInput, PurchaseRecord>();
            //        configuration.CreateMap<PurchaseRecord, GetPurchaseRecordForEditOutput>();
        }
    }
}