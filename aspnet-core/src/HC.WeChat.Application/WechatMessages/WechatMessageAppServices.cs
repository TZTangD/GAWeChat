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
using HC.WeChat.WechatMessages.Authorization;
using HC.WeChat.WechatMessages.Dtos;
using HC.WeChat.WechatMessages.DomainServices;
using HC.WeChat.WechatMessages;
using System;
using HC.WeChat.Authorization;

namespace HC.WeChat.WechatMessages
{
    /// <summary>
    /// WechatMessage应用层服务的接口实现方法
    /// </summary>
    //[AbpAuthorize(WechatMessageAppPermissions.WechatMessage)]
    [AbpAuthorize(AppPermissions.Pages)]
    public class WechatMessageAppService : WeChatAppServiceBase, IWechatMessageAppService
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<WechatMessage, Guid> _wechatmessageRepository;
        private readonly IWechatMessageManager _wechatmessageManager;

        /// <summary>
        /// 构造函数
        /// </summary>
        public WechatMessageAppService(IRepository<WechatMessage, Guid> wechatmessageRepository
      , IWechatMessageManager wechatmessageManager
        )
        {
            _wechatmessageRepository = wechatmessageRepository;
            _wechatmessageManager = wechatmessageManager;
        }

        /// <summary>
        /// 获取WechatMessage的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<WechatMessageListDto>> GetPagedWechatMessages(GetWechatMessagesInput input)
        {

            var query = _wechatmessageRepository.GetAll()
                .WhereIf((!string.IsNullOrEmpty(input.Filter)) && input.Filter != "null", m => m.KeyWord.Contains(input.Filter));

            //TODO:根据传入的参数添加过滤条件
            var wechatmessageCount = await query.CountAsync();

            var wechatmessages = await query
                .OrderBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();

            //var wechatmessageListDtos = ObjectMapper.Map<List <WechatMessageListDto>>(wechatmessages);
            var wechatmessageListDtos = wechatmessages.MapTo<List<WechatMessageListDto>>();

            return new PagedResultDto<WechatMessageListDto>(
                wechatmessageCount,
                wechatmessageListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取WechatMessageListDto信息
        /// </summary>
        public async Task<WechatMessageListDto> GetWechatMessageByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _wechatmessageRepository.GetAsync(input.Id);

            return entity.MapTo<WechatMessageListDto>();
        }

        /// <summary>
        /// 导出WechatMessage为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetWechatMessagesToExcel(){
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
        public async Task<GetWechatMessageForEditOutput> GetWechatMessageForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetWechatMessageForEditOutput();
            WechatMessageEditDto wechatmessageEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _wechatmessageRepository.GetAsync(input.Id.Value);

                wechatmessageEditDto = entity.MapTo<WechatMessageEditDto>();

                //wechatmessageEditDto = ObjectMapper.Map<List <wechatmessageEditDto>>(entity);
            }
            else
            {
                wechatmessageEditDto = new WechatMessageEditDto();
            }

            output.WechatMessage = wechatmessageEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改WechatMessage的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateWechatMessage(CreateOrUpdateWechatMessageInput input)
        {

            if (input.WechatMessage.Id.HasValue)
            {
                await UpdateWechatMessageAsync(input.WechatMessage);
            }
            else
            {
                await CreateWechatMessageAsync(input.WechatMessage);
            }
        }

        /// <summary>
        /// 新增WechatMessage
        /// </summary>
        //[AbpAuthorize(WechatMessageAppPermissions.WechatMessage_CreateWechatMessage)]
        protected virtual async Task<WechatMessageEditDto> CreateWechatMessageAsync(WechatMessageEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<WechatMessage>(input);
            entity.TenantId = AbpSession.TenantId;
            entity = await _wechatmessageRepository.InsertAsync(entity);
            return entity.MapTo<WechatMessageEditDto>();
        }

        /// <summary>
        /// 编辑WechatMessage
        /// </summary>
        //[AbpAuthorize(WechatMessageAppPermissions.WechatMessage_EditWechatMessage)]
        protected virtual async Task UpdateWechatMessageAsync(WechatMessageEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _wechatmessageRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            await _wechatmessageRepository.UpdateAsync(entity);
        }

        /// <summary>
        /// 删除WechatMessage信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        //[AbpAuthorize(WechatMessageAppPermissions.WechatMessage_DeleteWechatMessage)]
        public async Task DeleteWechatMessage(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _wechatmessageRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除WechatMessage的方法
        /// </summary>
        //[AbpAuthorize(WechatMessageAppPermissions.WechatMessage_BatchDeleteWechatMessages)]
        public async Task BatchDeleteWechatMessagesAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _wechatmessageRepository.DeleteAsync(s => input.Contains(s.Id));
        }

        /// <summary>
        /// 添加或者修改WechatMessage的方法
        /// </summary>
        /// <param name="input">关键字回复实体</param>
        /// <returns></returns>
        public async Task CreateOrUpdateWechatMessageDto(WechatMessageEditDto input)
        {
            if (input.Id.HasValue)
            {
                await UpdateWechatMessageAsync(input);
            }
            else
            {
                await CreateWechatMessageAsync(input);
            }
        }

    }
}

