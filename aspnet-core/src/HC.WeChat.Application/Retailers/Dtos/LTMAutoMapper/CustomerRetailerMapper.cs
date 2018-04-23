using AutoMapper;

namespace HC.WeChat.Retailers.Dtos.LTMAutoMapper
{
    using HC.WeChat.Retailers;

    /// <summary>
    /// 配置Retailer的AutoMapper
    /// </summary>
    internal static class CustomerRetailerMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <Retailer, RetailerDto>();
            configuration.CreateMap<Retailer, RetailerListDto>();
            configuration.CreateMap<RetailerEditDto, Retailer>();
            // configuration.CreateMap<CreateRetailerInput, Retailer>();
            //        configuration.CreateMap<Retailer, GetRetailerForEditOutput>();
        }
    }
}