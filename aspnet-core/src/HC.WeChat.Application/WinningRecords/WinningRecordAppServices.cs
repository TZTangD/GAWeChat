using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using System.Linq;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;

using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using HC.WeChat.WinningRecords.Authorization;
using HC.WeChat.WinningRecords.Dtos;
using HC.WeChat.WinningRecords.DomainServices;
using HC.WeChat.WinningRecords;
using System;
using HC.WeChat.Authorization;

namespace HC.WeChat.WinningRecords
{
    /// <summary>
    /// WinningRecord应用层服务的接口实现方法
    /// </summary>
    //[AbpAuthorize(WinningRecordAppPermissions.WinningRecord)]
    [AbpAuthorize(AppPermissions.Pages)]
    public class WinningRecordAppService : WeChatAppServiceBase, IWinningRecordAppService
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<WinningRecord, Guid> _winningrecordRepository;
        private readonly IWinningRecordManager _winningrecordManager;

        /// <summary>
        /// 构造函数
        /// </summary>
        public WinningRecordAppService(IRepository<WinningRecord, Guid> winningrecordRepository
      , IWinningRecordManager winningrecordManager
        )
        {
            _winningrecordRepository = winningrecordRepository;
            _winningrecordManager = winningrecordManager;
        }

        /// <summary>
        /// 获取WinningRecord的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<WinningRecordListDto>> GetPagedWinningRecords(GetWinningRecordsInput input)
        {

            var query = _winningrecordRepository.GetAll();
            //TODO:根据传入的参数添加过滤条件
            var winningrecordCount = await query.CountAsync();

            var winningrecords = await query
                .OrderBy(input.Sorting).AsNoTracking()
                .PageBy(input)
                .ToListAsync();

            //var winningrecordListDtos = ObjectMapper.Map<List <WinningRecordListDto>>(winningrecords);
            var winningrecordListDtos = winningrecords.MapTo<List<WinningRecordListDto>>();

            return new PagedResultDto<WinningRecordListDto>(
                winningrecordCount,
                winningrecordListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取WinningRecordListDto信息
        /// </summary>
        public async Task<WinningRecordListDto> GetWinningRecordByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _winningrecordRepository.GetAsync(input.Id);

            return entity.MapTo<WinningRecordListDto>();
        }

        /// <summary>
        /// 导出WinningRecord为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetWinningRecordsToExcel(){
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
        public async Task<GetWinningRecordForEditOutput> GetWinningRecordForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetWinningRecordForEditOutput();
            WinningRecordEditDto winningrecordEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _winningrecordRepository.GetAsync(input.Id.Value);

                winningrecordEditDto = entity.MapTo<WinningRecordEditDto>();

                //winningrecordEditDto = ObjectMapper.Map<List <winningrecordEditDto>>(entity);
            }
            else
            {
                winningrecordEditDto = new WinningRecordEditDto();
            }

            output.WinningRecord = winningrecordEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改WinningRecord的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateWinningRecord(CreateOrUpdateWinningRecordInput input)
        {

            if (input.WinningRecord.Id.HasValue)
            {
                await UpdateWinningRecordAsync(input.WinningRecord);
            }
            else
            {
                await CreateWinningRecordAsync(input.WinningRecord);
            }
        }

        /// <summary>
        /// 新增WinningRecord
        /// </summary>
        //[AbpAuthorize(WinningRecordAppPermissions.WinningRecord_CreateWinningRecord)]
        protected virtual async Task<WinningRecordEditDto> CreateWinningRecordAsync(WinningRecordEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<WinningRecord>(input);

            entity = await _winningrecordRepository.InsertAsync(entity);
            return entity.MapTo<WinningRecordEditDto>();
        }

        /// <summary>
        /// 编辑WinningRecord
        /// </summary>
        //[AbpAuthorize(WinningRecordAppPermissions.WinningRecord_EditWinningRecord)]
        protected virtual async Task UpdateWinningRecordAsync(WinningRecordEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _winningrecordRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            await _winningrecordRepository.UpdateAsync(entity);
        }

        /// <summary>
        /// 删除WinningRecord信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        //[AbpAuthorize(WinningRecordAppPermissions.WinningRecord_DeleteWinningRecord)]
        public async Task DeleteWinningRecord(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _winningrecordRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除WinningRecord的方法
        /// </summary>
        //[AbpAuthorize(WinningRecordAppPermissions.WinningRecord_BatchDeleteWinningRecords)]
        public async Task BatchDeleteWinningRecordsAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _winningrecordRepository.DeleteAsync(s => input.Contains(s.Id));
        }

    }
}

