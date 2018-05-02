using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;

using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using HC.WeChat.Products.Authorization;
using HC.WeChat.Products.Dtos;
using HC.WeChat.Products.DomainServices;
using HC.WeChat.Products;
using System;
using HC.WeChat.Authorization;

namespace HC.WeChat.Products
{
    /// <summary>
    /// Product应用层服务的接口实现方法
    /// </summary>
    //[AbpAuthorize(ProductAppPermissions.Product)]
    [AbpAuthorize(AppPermissions.Pages)]
    public class ProductAppService : WeChatAppServiceBase, IProductAppService
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<Product, Guid> _productRepository;
        private readonly IProductManager _productManager;

        /// <summary>
        /// 构造函数
        /// </summary>
        public ProductAppService(IRepository<Product, Guid> productRepository
      , IProductManager productManager
        )
        {
            _productRepository = productRepository;
            _productManager = productManager;
        }

        /// <summary>
        /// 获取Product的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<ProductListDto>> GetPagedProducts(GetProductsInput input)
        {

            var query = _productRepository.GetAll();
            //TODO:根据传入的参数添加过滤条件
            var productCount = await query.CountAsync();

            var products = await query
                .OrderBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();

            //var productListDtos = ObjectMapper.Map<List <ProductListDto>>(products);
            var productListDtos = products.MapTo<List<ProductListDto>>();

            return new PagedResultDto<ProductListDto>(
                productCount,
                productListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取ProductListDto信息
        /// </summary>
        public async Task<ProductListDto> GetProductByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _productRepository.GetAsync(input.Id);

            return entity.MapTo<ProductListDto>();
        }

        /// <summary>
        /// 导出Product为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetProductsToExcel(){
        //var users = await UserManager.Users.ToListAsync();
        //var userListDtos = ObjectMapper.Map<List<UserListDto>>(users);
        //await FillRoleNames(userListDtos);
        //return _userListExcelExporter.ExportToFile(userListDtos);
        //}
        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<GetProductForEditOutput> GetProductForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetProductForEditOutput();
            ProductEditDto productEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _productRepository.GetAsync(input.Id.Value);

                productEditDto = entity.MapTo<ProductEditDto>();

                //productEditDto = ObjectMapper.Map<List <productEditDto>>(entity);
            }
            else
            {
                productEditDto = new ProductEditDto();
            }

            output.Product = productEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改Product的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateProduct(CreateOrUpdateProductInput input)
        {

            if (input.Product.Id.HasValue)
            {
                await UpdateProductAsync(input.Product);
            }
            else
            {
                await CreateProductAsync(input.Product);
            }
        }

        /// <summary>
        /// 新增Product
        /// </summary>
        //[AbpAuthorize(ProductAppPermissions.Product_CreateProduct)]
        protected virtual async Task<ProductEditDto> CreateProductAsync(ProductEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<Product>(input);

            entity = await _productRepository.InsertAsync(entity);
            return entity.MapTo<ProductEditDto>();
        }

        /// <summary>
        /// 编辑Product
        /// </summary>
        //[AbpAuthorize(ProductAppPermissions.Product_EditProduct)]
        protected virtual async Task UpdateProductAsync(ProductEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _productRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            await _productRepository.UpdateAsync(entity);
        }

        /// <summary>
        /// 删除Product信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        //[AbpAuthorize(ProductAppPermissions.Product_DeleteProduct)]
        public async Task DeleteProduct(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _productRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除Product的方法
        /// </summary>
        //[AbpAuthorize(ProductAppPermissions.Product_BatchDeleteProducts)]
        public async Task BatchDeleteProductsAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _productRepository.DeleteAsync(s => input.Contains(s.Id));
        }

    }
}

