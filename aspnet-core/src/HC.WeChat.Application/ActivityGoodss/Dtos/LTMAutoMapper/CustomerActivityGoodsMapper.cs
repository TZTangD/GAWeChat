using AutoMapper;

namespace HC.WeChat.ActivityGoodses.Dtos.LTMAutoMapper
{
    using HC.WeChat.ActivityGoodses;

    /// <summary>
    /// 配置ActivityGoods的AutoMapper
    /// </summary>
    internal static class CustomerActivityGoodsMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <ActivityGoods, ActivityGoodsDto>();
            configuration.CreateMap<ActivityGoods, ActivityGoodsListDto>();
            configuration.CreateMap<ActivityGoodsEditDto, ActivityGoods>();
            // configuration.CreateMap<CreateActivityGoodsInput, ActivityGoods>();
            //        configuration.CreateMap<ActivityGoods, GetActivityGoodsForEditOutput>();
        }
    }
}