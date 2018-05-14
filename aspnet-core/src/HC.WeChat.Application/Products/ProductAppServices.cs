using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using System.Linq;

using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using HC.WeChat.Products.Authorization;
using HC.WeChat.Products.Dtos;
using HC.WeChat.Products.DomainServices;
using HC.WeChat.Products;
using System;
using HC.WeChat.Authorization;
using Microsoft.AspNetCore.Hosting;
//using System.Linq;

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
        private readonly IHostingEnvironment _hostingEnvironment;

        /// <summary>
        /// 构造函数
        /// </summary>
        public ProductAppService(IRepository<Product, Guid> productRepository
      , IProductManager productManager, IHostingEnvironment hostingEnvironment
        )
        {
            _productRepository = productRepository;
            _productManager = productManager;
            _hostingEnvironment = hostingEnvironment;
        }

        /// <summary>
        /// 获取Product的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<ProductListDto>> GetPagedProducts(GetProductsInput input)
        {

            var query = _productRepository.GetAll()
                .WhereIf(!string.IsNullOrEmpty(input.Name), p => p.Specification.Contains(input.Name))
                .WhereIf(input.Type.HasValue, p => p.Type == input.Type)
                .WhereIf(input.IsRare.HasValue, p => p.IsRare == input.IsRare);
            //TODO:根据传入的参数添加过滤条件
            var productCount = await query.CountAsync();

            var products = await query
                .OrderBy(p => p.Specification)
                .ThenBy(input.Sorting)
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
        protected virtual async Task<ProductEditDto> UpdateProductAsync(ProductEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _productRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            var result = await _productRepository.UpdateAsync(entity);
            return result.MapTo<ProductEditDto>();
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

        /// <summary>
        /// 通过指定id获取ProductListDto信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<ProductListDto> GetProductByIdDtoAsync(EntityDto<Guid> input)
        {
            var entity = await _productRepository.GetAll().Where(p => p.Id == input.Id).FirstOrDefaultAsync();
            return entity.MapTo<ProductListDto>();
        }


        /// <summary>
        /// 添加或者修改Product的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateProductDto(ProductEditDto input)
        {
            string webRootPath = _hostingEnvironment.WebRootPath;
            var entity = _productRepository.GetAsync(input.Id.MapTo<Guid>()).Result;
            var url = entity.PhotoUrl;
            if (input.Id.HasValue)
            {
                var result = await UpdateProductAsync(input);
                //删除原来的单个图片
                if (url != result.PhotoUrl)
                {
                    if (System.IO.File.Exists(webRootPath + url))
                    {
                        System.IO.File.Delete(webRootPath + url);
                    }
                }

            }
            else
            {
                await CreateProductAsync(input);
            }
        }

        /// <summary>
        /// 获取特色商品
        /// </summary>
        [AbpAllowAnonymous]
        public async Task<RareProductDto> GetRareProduct(int? tenantId)
        {
            using (CurrentUnitOfWork.SetTenantId(tenantId))
            {
                var query = _productRepository.GetAll().Where(p => p.IsRare == true && p.IsAction == true);

                RareProductDto data = new RareProductDto();
                data.CigaretteProducts = (await query.Where(q => q.Type == WechatEnums.ProductTypeEnum.卷烟类).OrderBy(q => q.Specification).ToListAsync()).MapTo<List<ProductListDto>>();
                data.SpecialProducts = (await query.Where(q => q.Type == WechatEnums.ProductTypeEnum.特产类).OrderBy(q => q.Specification).ToListAsync()).MapTo<List<ProductListDto>>();
                return data;
            }
        }

        [AbpAllowAnonymous]
        public async Task<ShopProductDto> GetShopProductByCode(string code, int? tenantId)
        {
            using (CurrentUnitOfWork.SetTenantId(tenantId))
            {
                var query = await _productRepository.GetAll()
                    .Where(p => p.IsAction == true && p.Type == WechatEnums.ProductTypeEnum.卷烟类)
                    .Where(p => p.PackageCode == code || p.BarCode == code)
                    .FirstOrDefaultAsync();
                var shopProduct = query.MapTo<ShopProductDto>();
                if (shopProduct != null)
                {
                    if (shopProduct.PackageCode == code)
                    {
                        shopProduct.Num = 1;
                    }
                    else
                    {
                        shopProduct.Num = 10;
                    }
                    return shopProduct;
                }

                return null;
            }
        }

        /// <summary>
        /// 检查包码条码是否重复（0：不重复，1：包码重复，2：条码重复，3：包码、条码重复）
        /// </summary>
        /// <param name="code"></param>
        /// <param name="tenantId"></param>
        /// <returns></returns>
        public async Task<int> GetCheckCode(CheckInput input)
        {
            var result = 0;
            var countP = await _productRepository.GetAll().Where(p => p.PackageCode == input.PCode || p.BarCode == input.PCode).WhereIf(input.ProductId != Guid.Empty, p => p.Id != input.ProductId).CountAsync();
            var countB = await _productRepository.GetAll().Where(p => p.BarCode == input.BCode || p.PackageCode == input.BCode).WhereIf(input.ProductId != Guid.Empty, p => p.Id != input.ProductId).CountAsync();
            //var entity = _productRepository.GetAll().Where(e => e.Id == input.ProductId).FirstOrDefault();

            if (countB > 0 && countP > 0)
            {
                result = 3;
            }
            else if (countB > 0 && countP == 0)
            {
                result = 2;
            }
            else if (countB == 0 && countP > 0)
            {
                result = 1;
            }
            return result;
        }
    }
}

