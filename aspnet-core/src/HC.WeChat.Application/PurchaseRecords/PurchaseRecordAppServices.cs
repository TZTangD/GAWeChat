using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;

using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using HC.WeChat.PurchaseRecords.Authorization;
using HC.WeChat.PurchaseRecords.Dtos;
using HC.WeChat.PurchaseRecords.DomainServices;
using HC.WeChat.PurchaseRecords;
using System;
using HC.WeChat.Authorization;

namespace HC.WeChat.PurchaseRecords
{
    /// <summary>
    /// PurchaseRecord应用层服务的接口实现方法
    /// </summary>
    //[AbpAuthorize(PurchaseRecordAppPermissions.PurchaseRecord)]
    [AbpAuthorize(AppPermissions.Pages)]
    public class PurchaseRecordAppService : WeChatAppServiceBase, IPurchaseRecordAppService
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<PurchaseRecord, Guid> _purchaserecordRepository;
        private readonly IPurchaseRecordManager _purchaserecordManager;

        /// <summary>
        /// 构造函数
        /// </summary>
        public PurchaseRecordAppService(IRepository<PurchaseRecord, Guid> purchaserecordRepository
      , IPurchaseRecordManager purchaserecordManager
        )
        {
            _purchaserecordRepository = purchaserecordRepository;
            _purchaserecordManager = purchaserecordManager;
        }

        /// <summary>
        /// 获取PurchaseRecord的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<PurchaseRecordListDto>> GetPagedPurchaseRecords(GetPurchaseRecordsInput input)
        {

            var query = _purchaserecordRepository.GetAll();
            //TODO:根据传入的参数添加过滤条件
            var purchaserecordCount = await query.CountAsync();

            var purchaserecords = await query
                .OrderBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();

            //var purchaserecordListDtos = ObjectMapper.Map<List <PurchaseRecordListDto>>(purchaserecords);
            var purchaserecordListDtos = purchaserecords.MapTo<List<PurchaseRecordListDto>>();

            return new PagedResultDto<PurchaseRecordListDto>(
                purchaserecordCount,
                purchaserecordListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取PurchaseRecordListDto信息
        /// </summary>
        public async Task<PurchaseRecordListDto> GetPurchaseRecordByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _purchaserecordRepository.GetAsync(input.Id);

            return entity.MapTo<PurchaseRecordListDto>();
        }

        /// <summary>
        /// 导出PurchaseRecord为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetPurchaseRecordsToExcel(){
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
        public async Task<GetPurchaseRecordForEditOutput> GetPurchaseRecordForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetPurchaseRecordForEditOutput();
            PurchaseRecordEditDto purchaserecordEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _purchaserecordRepository.GetAsync(input.Id.Value);

                purchaserecordEditDto = entity.MapTo<PurchaseRecordEditDto>();

                //purchaserecordEditDto = ObjectMapper.Map<List <purchaserecordEditDto>>(entity);
            }
            else
            {
                purchaserecordEditDto = new PurchaseRecordEditDto();
            }

            output.PurchaseRecord = purchaserecordEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改PurchaseRecord的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdatePurchaseRecord(CreateOrUpdatePurchaseRecordInput input)
        {

            if (input.PurchaseRecord.Id.HasValue)
            {
                await UpdatePurchaseRecordAsync(input.PurchaseRecord);
            }
            else
            {
                await CreatePurchaseRecordAsync(input.PurchaseRecord);
            }
        }

        /// <summary>
        /// 新增PurchaseRecord
        /// </summary>
        //[AbpAuthorize(PurchaseRecordAppPermissions.PurchaseRecord_CreatePurchaseRecord)]
        protected virtual async Task<PurchaseRecordEditDto> CreatePurchaseRecordAsync(PurchaseRecordEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<PurchaseRecord>(input);

            entity = await _purchaserecordRepository.InsertAsync(entity);
            return entity.MapTo<PurchaseRecordEditDto>();
        }

        /// <summary>
        /// 编辑PurchaseRecord
        /// </summary>
        //[AbpAuthorize(PurchaseRecordAppPermissions.PurchaseRecord_EditPurchaseRecord)]
        protected virtual async Task UpdatePurchaseRecordAsync(PurchaseRecordEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _purchaserecordRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            await _purchaserecordRepository.UpdateAsync(entity);
        }

        /// <summary>
        /// 删除PurchaseRecord信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        //[AbpAuthorize(PurchaseRecordAppPermissions.PurchaseRecord_DeletePurchaseRecord)]
        public async Task DeletePurchaseRecord(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _purchaserecordRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除PurchaseRecord的方法
        /// </summary>
        //[AbpAuthorize(PurchaseRecordAppPermissions.PurchaseRecord_BatchDeletePurchaseRecords)]
        public async Task BatchDeletePurchaseRecordsAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _purchaserecordRepository.DeleteAsync(s => input.Contains(s.Id));
        }

    }
}

