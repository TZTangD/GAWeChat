using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;

using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using HC.WeChat.WechatSubscribes.Authorization;
using HC.WeChat.WechatSubscribes.Dtos;
using HC.WeChat.WechatSubscribes.DomainServices;
using HC.WeChat.WechatSubscribes;
using System;
using HC.WeChat.Authorization;

namespace HC.WeChat.WechatSubscribes
{
    /// <summary>
    /// WechatSubscribe应用层服务的接口实现方法
    /// </summary>
    //[AbpAuthorize(WechatSubscribeAppPermissions.WechatSubscribe)]
    [AbpAuthorize(AppPermissions.Pages)]
    public class WechatSubscribeAppService : WeChatAppServiceBase, IWechatSubscribeAppService
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<WechatSubscribe, Guid> _wechatsubscribeRepository;
        private readonly IWechatSubscribeManager _wechatsubscribeManager;

        /// <summary>
        /// 构造函数
        /// </summary>
        public WechatSubscribeAppService(IRepository<WechatSubscribe, Guid> wechatsubscribeRepository
      , IWechatSubscribeManager wechatsubscribeManager
        )
        {
            _wechatsubscribeRepository = wechatsubscribeRepository;
            _wechatsubscribeManager = wechatsubscribeManager;
        }

        /// <summary>
        /// 获取WechatSubscribe的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<WechatSubscribeListDto>> GetPagedWechatSubscribes(GetWechatSubscribesInput input)
        {

            var query = _wechatsubscribeRepository.GetAll();
            //TODO:根据传入的参数添加过滤条件
            var wechatsubscribeCount = await query.CountAsync();

            var wechatsubscribes = await query
                .OrderBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();

            //var wechatsubscribeListDtos = ObjectMapper.Map<List <WechatSubscribeListDto>>(wechatsubscribes);
            var wechatsubscribeListDtos = wechatsubscribes.MapTo<List<WechatSubscribeListDto>>();

            return new PagedResultDto<WechatSubscribeListDto>(
                wechatsubscribeCount,
                wechatsubscribeListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取WechatSubscribeListDto信息
        /// </summary>
        public async Task<WechatSubscribeListDto> GetWechatSubscribeByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _wechatsubscribeRepository.GetAsync(input.Id);

            return entity.MapTo<WechatSubscribeListDto>();
        }

        /// <summary>
        /// 导出WechatSubscribe为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetWechatSubscribesToExcel(){
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
        public async Task<GetWechatSubscribeForEditOutput> GetWechatSubscribeForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetWechatSubscribeForEditOutput();
            WechatSubscribeEditDto wechatsubscribeEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _wechatsubscribeRepository.GetAsync(input.Id.Value);

                wechatsubscribeEditDto = entity.MapTo<WechatSubscribeEditDto>();

                //wechatsubscribeEditDto = ObjectMapper.Map<List <wechatsubscribeEditDto>>(entity);
            }
            else
            {
                wechatsubscribeEditDto = new WechatSubscribeEditDto();
            }

            output.WechatSubscribe = wechatsubscribeEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改WechatSubscribe的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateWechatSubscribe(CreateOrUpdateWechatSubscribeInput input)
        {

            if (input.WechatSubscribe.Id.HasValue)
            {
                await UpdateWechatSubscribeAsync(input.WechatSubscribe);
            }
            else
            {
                await CreateWechatSubscribeAsync(input.WechatSubscribe);
            }
        }

        /// <summary>
        /// 新增WechatSubscribe
        /// </summary>
        //[AbpAuthorize(WechatSubscribeAppPermissions.WechatSubscribe_CreateWechatSubscribe)]
        protected virtual async Task<WechatSubscribeEditDto> CreateWechatSubscribeAsync(WechatSubscribeEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<WechatSubscribe>(input);
            entity.TenantId = AbpSession.TenantId;
            entity = await _wechatsubscribeRepository.InsertAsync(entity);
            return entity.MapTo<WechatSubscribeEditDto>();
        }

        /// <summary>
        /// 编辑WechatSubscribe
        /// </summary>
        //[AbpAuthorize(WechatSubscribeAppPermissions.WechatSubscribe_EditWechatSubscribe)]
        protected virtual async Task UpdateWechatSubscribeAsync(WechatSubscribeEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _wechatsubscribeRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            await _wechatsubscribeRepository.UpdateAsync(entity);
        }

        /// <summary>
        /// 删除WechatSubscribe信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        //[AbpAuthorize(WechatSubscribeAppPermissions.WechatSubscribe_DeleteWechatSubscribe)]
        public async Task DeleteWechatSubscribe(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _wechatsubscribeRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除WechatSubscribe的方法
        /// </summary>
        //[AbpAuthorize(WechatSubscribeAppPermissions.WechatSubscribe_BatchDeleteWechatSubscribes)]
        public async Task BatchDeleteWechatSubscribesAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _wechatsubscribeRepository.DeleteAsync(s => input.Contains(s.Id));
        }
        
        /// <summary>
        /// 通过租户id获取关注回复消息
        /// </summary>
        /// <returns></returns>
        public async Task<WechatSubscribeListDto> GetSubscribeInfoByTenantId()
        {
            var entity =await  _wechatsubscribeRepository.GetAll().FirstOrDefaultAsync(s => s.TenantId == AbpSession.TenantId);
            return entity.MapTo<WechatSubscribeListDto>();

        }

        /// <summary>
        /// 添加或者修改WechatSubscribe的方法
        /// </summary>
        /// <param name="input">被关注回复实体</param>
        /// <returns></returns>
        public async Task CreateOrUpdateWechatSubscribeDto(WechatSubscribeEditDto input)
        {
            if (input.Id.HasValue)
            {
                await UpdateWechatSubscribeAsync(input);
            }
            else
            {
                await CreateWechatSubscribeAsync(input);
            }
        }

    }
}

