using AutoMapper;

namespace HC.WeChat.Products.Dtos.LTMAutoMapper
{
    using HC.WeChat.Products;

    /// <summary>
    /// 配置Product的AutoMapper
    /// </summary>
    internal static class CustomerProductMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            //    configuration.CreateMap <Product, ProductDto>();
            configuration.CreateMap<Product, ProductListDto>();
            configuration.CreateMap<ProductEditDto, Product>();
            // configuration.CreateMap<CreateProductInput, Product>();
            //        configuration.CreateMap<Product, GetProductForEditOutput>();
        }
    }
}