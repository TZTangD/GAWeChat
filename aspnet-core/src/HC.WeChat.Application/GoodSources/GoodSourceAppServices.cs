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
using HC.WeChat.GoodSources.Authorization;
using HC.WeChat.GoodSources.Dtos;
using HC.WeChat.GoodSources.DomainServices;
using HC.WeChat.GoodSources;
using System;
using HC.WeChat.Products;
using HC.WeChat.Authorization;
using Abp.Domain.Uow;
using Microsoft.AspNetCore.Hosting;
using HC.WeChat.Dto;
using HC.WeChat.Helpers;
using System.IO;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;

namespace HC.WeChat.GoodSources
{
    /// <summary>
    /// GoodSource应用层服务的接口实现方法
    /// </summary>
    //[AbpAuthorize(GoodSourceAppPermissions.GoodSource)]
    [AbpAuthorize(AppPermissions.Pages)]
    public class GoodSourceAppService : WeChatAppServiceBase, IGoodSourceAppService
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<GoodSource, Guid> _goodsourceRepository;
        private readonly IGoodSourceManager _goodsourceManager;
        private readonly IRepository<Product, Guid> _productRepository;
        private readonly IHostingEnvironment _hostingEnvironment;

        /// <summary>
        /// 构造函数
        /// </summary>
        public GoodSourceAppService(IRepository<GoodSource, Guid> goodsourceRepository
      , IGoodSourceManager goodsourceManager, IRepository<Product, Guid> productRepository
               , IHostingEnvironment hostingEnvironment
        )
        {
            _goodsourceRepository = goodsourceRepository;
            _goodsourceManager = goodsourceManager;
            _productRepository = productRepository;
            _hostingEnvironment = hostingEnvironment;

        }

        /// <summary>
        /// 获取GoodSource的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<GoodSourceListDto>> GetPagedGoodSources(GetGoodSourcesInput input)
        {

            var query = _goodsourceRepository.GetAll()
                .WhereIf(!string.IsNullOrEmpty(input.CusName), u => u.cusName.Contains(input.CusName))
                .WhereIf(!string.IsNullOrEmpty(input.CustCode), u => u.custCode.Contains(input.CustCode))
                .WhereIf(!string.IsNullOrEmpty(input.GoodName), u => u.goodName.Contains(input.GoodName));

            //TODO:根据传入的参数添加过滤条件
            var goodsourceCount = await query.CountAsync();

            var goodsources = await query
                .OrderBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();

            //var goodsourceListDtos = ObjectMapper.Map<List <GoodSourceListDto>>(goodsources);
            var goodsourceListDtos = goodsources.MapTo<List<GoodSourceListDto>>();

            return new PagedResultDto<GoodSourceListDto>(
                goodsourceCount,
                goodsourceListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取GoodSourceListDto信息
        /// </summary>
        public async Task<GoodSourceListDto> GetGoodSourceByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _goodsourceRepository.GetAsync(input.Id);

            return entity.MapTo<GoodSourceListDto>();
        }

        /// <summary>
        /// 导出GoodSource为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetGoodSourcesToExcel(){
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
        public async Task<GetGoodSourceForEditOutput> GetGoodSourceForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetGoodSourceForEditOutput();
            GoodSourceEditDto goodsourceEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _goodsourceRepository.GetAsync(input.Id.Value);

                goodsourceEditDto = entity.MapTo<GoodSourceEditDto>();

                //goodsourceEditDto = ObjectMapper.Map<List <goodsourceEditDto>>(entity);
            }
            else
            {
                goodsourceEditDto = new GoodSourceEditDto();
            }

            output.GoodSource = goodsourceEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改GoodSource的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateGoodSource(CreateOrUpdateGoodSourceInput input)
        {

            if (input.GoodSource.Id.HasValue)
            {
                await UpdateGoodSourceAsync(input.GoodSource);
            }
            else
            {
                await CreateGoodSourceAsync(input.GoodSource);
            }
        }

        /// <summary>
        /// 新增GoodSource
        /// </summary>
        [AbpAuthorize(GoodSourceAppPermissions.GoodSource_CreateGoodSource)]
        protected virtual async Task<GoodSourceEditDto> CreateGoodSourceAsync(GoodSourceEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<GoodSource>(input);

            entity = await _goodsourceRepository.InsertAsync(entity);
            return entity.MapTo<GoodSourceEditDto>();
        }

        /// <summary>
        /// 编辑GoodSource
        /// </summary>
        [AbpAuthorize(GoodSourceAppPermissions.GoodSource_EditGoodSource)]
        protected virtual async Task UpdateGoodSourceAsync(GoodSourceEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _goodsourceRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            await _goodsourceRepository.UpdateAsync(entity);
        }

        /// <summary>
        /// 删除GoodSource信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [AbpAuthorize(GoodSourceAppPermissions.GoodSource_DeleteGoodSource)]
        public async Task DeleteGoodSource(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _goodsourceRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除GoodSource的方法
        /// </summary>
        [AbpAuthorize(GoodSourceAppPermissions.GoodSource_BatchDeleteGoodSources)]
        public async Task BatchDeleteGoodSourcesAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _goodsourceRepository.DeleteAsync(s => input.Contains(s.Id));
        }

        /// <summary>
        /// 获取指定零售户档级货源
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [AbpAllowAnonymous]
        public async Task<List<GoodSourceListForWeChatDto>> GetPagedGoodSourcesForWeChatAsync(GetGoodSourcesInput input)
        {
            using (CurrentUnitOfWork.SetTenantId(input.tenantId))
            {
                var goodSource = _goodsourceRepository.GetAll().Where(g => g.custCode == input.CustCode).OrderBy(g => g.goodCode).Skip(input.SkipCount).Take(input.MaxResultCount);
                var puduct = _productRepository.GetAll();
                var result = await (from g in goodSource
                                    join p in puduct on g.goodCode equals p.ItemCode
                                    select new GoodSourceListForWeChatDto
                                    {
                                        Id = g.Id,
                                        CustCode = input.CustCode,
                                        ItemCode = g.goodCode,
                                        ItemName = p.Specification,
                                        Amount = g.amount
                                    }).ToListAsync();

                return result;
            }
        }


        #region 导出档级模板

        public async Task<List<GoodSourceListDto>> GetGoodSourceListAsync(GetGoodSourcesInput input)
        {
            var query = _goodsourceRepository.GetAll()
                   .WhereIf(!string.IsNullOrEmpty(input.CusName), u => u.cusName.Contains(input.CusName))
                .WhereIf(!string.IsNullOrEmpty(input.CustCode), u => u.custCode.Contains(input.CustCode))
                .WhereIf(!string.IsNullOrEmpty(input.GoodName), u => u.goodName.Contains(input.GoodName))
            .Select(gs => new GoodSourceListDto()
            {
                cusName = gs.cusName,
                custCode = gs.custCode,
                goodName = gs.goodName,
                amount = gs.amount,
                goodCode = gs.goodCode
            });
            return await query.ToListAsync();
        }

        private string SaveGoodSourceExcel(string fileName, List<GoodSourceListDto> data)
        {
            var fullPath = ExcelHelper.GetSavePath(_hostingEnvironment.WebRootPath) + fileName;
            using (var fs = new FileStream(fullPath, FileMode.Create, FileAccess.Write))
            {
                IWorkbook workbook = new XSSFWorkbook();
                ISheet sheet = workbook.CreateSheet("GoodSource");
                var rowIndex = 0;
                IRow titleRow = sheet.CreateRow(rowIndex);
                string[] titles = { "客户编码", "客户名称", "投放量", "投放品牌", "品牌编码" };
                var fontTitle = workbook.CreateFont();
                fontTitle.IsBold = true;
                for (int i = 0; i < titles.Length; i++)
                {
                    var cell = titleRow.CreateCell(i);
                    cell.CellStyle.SetFont(fontTitle);
                    cell.SetCellValue(titles[i]);
                }

                var font = workbook.CreateFont();
                foreach (var item in data)
                {
                    rowIndex++;
                    IRow row = sheet.CreateRow(rowIndex);
                    ExcelHelper.SetCell(row.CreateCell(0), font, item.custCode);
                    ExcelHelper.SetCell(row.CreateCell(1), font, item.cusName);
                    ExcelHelper.SetCell(row.CreateCell(2), font, item.amount.ToString());
                    ExcelHelper.SetCell(row.CreateCell(3), font, item.goodName);
                    ExcelHelper.SetCell(row.CreateCell(4), font, item.goodCode);
                }

                workbook.Write(fs);
            }
            return "/files/downloadtemp/" + fileName;
        }

        [UnitOfWork(isTransactional: false)]
        public async Task<APIResultDto> ExportGoodSourceExcel(GetGoodSourcesInput input)
        {
            try
            {
                var exportData = await GetGoodSourceListAsync(input);
                var result = new APIResultDto();
                result.Code = 0;
                result.Data = SaveGoodSourceExcel("档级货源.xlsx", exportData);
                return result;
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat("ExportPostInfoExcel errormsg:{0} Exception:{1}", ex.Message, ex);
                return new APIResultDto() { Code = 901, Msg = "网络忙... 请待会重试！" };
            }
        }

        #endregion

        #region 导入货源档级

        /// <summary>
        /// 更新到数据库
        /// </summary>
        private async Task UpdateGoodSourcesAsync(List<GoodSourceListDto> GoodSourceList)
        {
            var rlcodes = GoodSourceList.Select(r => r.custCode).ToArray();
            var retailerList = await _goodsourceRepository.GetAll().Where(r => rlcodes.Contains(r.custCode)).ToListAsync();
            foreach (var item in GoodSourceList)
            {
                var retailer = retailerList.Where(r => r.custCode == item.custCode).FirstOrDefault();
                if (retailer != null)
                {
                    retailer.cusName = item.cusName;
                    retailer.goodName = item.goodName;
                    retailer.amount = item.amount;
                    retailer.goodCode = item.goodCode;
                }
            }
            await CurrentUnitOfWork.SaveChangesAsync();
        }

        /// <summary>
        /// 从上传的Excel读出数据
        /// </summary>
        private async Task<List<GoodSourceListDto>> GetGoodSourceAsync()
        {
            string fileName = _hostingEnvironment.WebRootPath + "/upload/files/GoodSourceUpload.xlsx";
            var resultList = new List<GoodSourceListDto>();
            using (var fs = new FileStream(fileName, FileMode.Open, FileAccess.Read))
            {
                IWorkbook workbook = new XSSFWorkbook(fs);
                ISheet sheet = workbook.GetSheet("GoodSource");
                if (sheet == null) //如果没有找到指定的sheetName对应的sheet，则尝试获取第一个sheet
                {
                    sheet = workbook.GetSheetAt(0);
                }

                if (sheet != null)
                {
                    //最后一列的标号
                    int rowCount = sheet.LastRowNum;
                    for (int i = 1; i <= rowCount; ++i)//排除首行标题
                    {
                        IRow row = sheet.GetRow(i);
                        if (row == null) continue; //没有数据的行默认是null　　　　　　　

                        var GoodSource = new GoodSourceListDto();
                        if (row.GetCell(1) != null && row.GetCell(3) != null)
                        {
                            GoodSource.custCode = row.GetCell(0).ToString();
                            GoodSource.cusName = row.GetCell(1).ToString();
                            GoodSource.amount = decimal.Parse(row.GetCell(2).ToString());
                            GoodSource.goodName = row.GetCell(3).ToString();
                            GoodSource.goodCode = row.GetCell(4).ToString();
                            resultList.Add(GoodSource);
                        }
                    }
                }

                return await Task.FromResult(resultList);
            }
        }

        /// <summary>
        /// 导入档级
        /// </summary>
        public async Task<APIResultDto> ImportGoodSourceExcelAsync()
        {
            //获取Excel数据
            var excelList = await GetGoodSourceAsync();
            //循环批量更新
            await UpdateGoodSourcesAsync(excelList);
            return new APIResultDto() { Code = 0, Msg = "导入数据成功" };
        }

        #endregion
    }
}

