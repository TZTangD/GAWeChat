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
using HC.WeChat.QrCodeLogs.Authorization;
using HC.WeChat.QrCodeLogs.DomainServices;
using HC.WeChat.QrCodeLogs.Dtos;
using HC.WeChat.QrCodeLogs;
using System;
using HC.WeChat.Authorization;

namespace HC.WeChat.QrCodeLogs
{
    /// <summary>
    /// QrCodeLog应用层服务的接口实现方法
    /// </summary>
    //[AbpAuthorize(QrCodeLogAppPermissions.QrCodeLog)]
    [AbpAuthorize(AppPermissions.Pages)]
    public class QrCodeLogAppService : WeChatAppServiceBase, IQrCodeLogAppService
    {
        private readonly IRepository<QrCodeLog, Guid> _qrcodelogRepository;
        private readonly IQrCodeLogManager _qrcodelogManager;

        /// <summary>
        /// 构造函数
        /// </summary>
        public QrCodeLogAppService(
            IRepository<QrCodeLog, Guid> qrcodelogRepository
      , IQrCodeLogManager qrcodelogManager
        )
        {
            _qrcodelogRepository = qrcodelogRepository;
            _qrcodelogManager = qrcodelogManager;
        }


        /// <summary>
        /// 获取QrCodeLog的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<QrCodeLogListDto>> GetPagedQrCodeLogs(GetQrCodeLogsInput input)
        {

            var query = _qrcodelogRepository.GetAll();
            //TODO:根据传入的参数添加过滤条件

            var qrcodelogCount = await query.CountAsync();

            var qrcodelogs = await query
                .OrderBy(input.Sorting).AsNoTracking()
                .PageBy(input)
                .ToListAsync();

            //var qrcodelogListDtos = ObjectMapper.Map<List <QrCodeLogListDto>>(qrcodelogs);
            var qrcodelogListDtos = qrcodelogs.MapTo<List<QrCodeLogListDto>>();

            return new PagedResultDto<QrCodeLogListDto>(
                qrcodelogCount,
                qrcodelogListDtos
                );






        }

        /// <summary>
        /// 通过指定id获取QrCodeLogListDto信息
        /// </summary>
        public async Task<QrCodeLogListDto> GetQrCodeLogByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _qrcodelogRepository.GetAsync(input.Id);

            return entity.MapTo<QrCodeLogListDto>();
        }






        /// <summary>
        /// 导出QrCodeLog为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetQrCodeLogsToExcel(){

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
        public async Task<GetQrCodeLogForEditOutput> GetQrCodeLogForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetQrCodeLogForEditOutput();
            QrCodeLogEditDto qrcodelogEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _qrcodelogRepository.GetAsync(input.Id.Value);

                qrcodelogEditDto = entity.MapTo<QrCodeLogEditDto>();

                //qrcodelogEditDto = ObjectMapper.Map<List <qrcodelogEditDto>>(entity);


            }
            else
            {
                qrcodelogEditDto = new QrCodeLogEditDto();
            }

            output.QrCodeLog = qrcodelogEditDto;
            return output;

        }


        /// <summary>
        /// 添加或者修改QrCodeLog的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateQrCodeLog(CreateOrUpdateQrCodeLogInput input)
        {

            if (input.QrCodeLog.Id.HasValue)
            {
                await UpdateQrCodeLogAsync(input.QrCodeLog);
            }
            else
            {
                await CreateQrCodeLogAsync(input.QrCodeLog);
            }
        }

        /// <summary>
        /// 新增QrCodeLog
        /// </summary>
        [AbpAuthorize(QrCodeLogAppPermissions.QrCodeLog_CreateQrCodeLog)]
        protected virtual async Task<QrCodeLogEditDto> CreateQrCodeLogAsync(QrCodeLogEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增

            var entity = ObjectMapper.Map<QrCodeLog>(input);

            entity = await _qrcodelogRepository.InsertAsync(entity);
            return entity.MapTo<QrCodeLogEditDto>();
        }

        /// <summary>
        /// 编辑QrCodeLog
        /// </summary>
        [AbpAuthorize(QrCodeLogAppPermissions.QrCodeLog_EditQrCodeLog)]
        protected virtual async Task UpdateQrCodeLogAsync(QrCodeLogEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新

            var entity = await _qrcodelogRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            await _qrcodelogRepository.UpdateAsync(entity);
        }




        /// <summary>
        /// 删除QrCodeLog信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [AbpAuthorize(QrCodeLogAppPermissions.QrCodeLog_DeleteQrCodeLog)]
        public async Task DeleteQrCodeLog(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _qrcodelogRepository.DeleteAsync(input.Id);
        }



        /// <summary>
        /// 批量删除QrCodeLog的方法
        /// </summary>
        [AbpAuthorize(QrCodeLogAppPermissions.QrCodeLog_BatchDeleteQrCodeLogs)]
        public async Task BatchDeleteQrCodeLogsAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _qrcodelogRepository.DeleteAsync(s => input.Contains(s.Id));
        }

    }
}


