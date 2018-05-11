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
using HC.WeChat.WeChatGroups.Authorization;
using HC.WeChat.WeChatGroups.Dtos;
using HC.WeChat.WeChatGroups.DomainServices;
using HC.WeChat.WeChatGroups;
using Senparc.Weixin.MP.AdvancedAPIs;
using Senparc.Weixin.CommonAPIs;
using Senparc.Weixin.MP.Containers;
using HC.WeChat.Authorization;
using Senparc.Weixin.Entities;
using HC.WeChat.WechatAppConfigs;
using HC.WeChat.WechatAppConfigs.Dtos;
using HC.WeChat.WeChatUsers;
using System;
using HC.WeChat.Dto;
using HC.WeChat.WechatEnums;

namespace HC.WeChat.WeChatGroups
{
    /// <summary>
    /// WeChatGroup应用层服务的接口实现方法
    /// </summary>
    //[AbpAuthorize(WeChatGroupAppPermissions.WeChatGroup)]
    [AbpAuthorize(AppPermissions.Pages)]
    public class WeChatGroupAppService : WeChatAppServiceBase, IWeChatGroupAppService
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<WeChatGroup, int> _wechatgroupRepository;
        private readonly IWeChatGroupManager _wechatgroupManager;
        IWechatAppConfigAppService _wechatAppConfigAppService;
        private readonly IRepository<WeChatUser, Guid> _wechatuserRepository;

        private int? TenantId { get; set; }
        private WechatAppConfigInfo AppConfig { get; set; }
        /// <summary>
        /// 构造函数
        /// </summary>
        public WeChatGroupAppService(IRepository<WeChatGroup, int> wechatgroupRepository
      , IWeChatGroupManager wechatgroupManager, IWechatAppConfigAppService wechatAppConfigAppService
      , IRepository<WeChatUser, Guid> wechatuserRepository
        )
        {
            _wechatgroupRepository = wechatgroupRepository;
            _wechatgroupManager = wechatgroupManager;
            _wechatAppConfigAppService = wechatAppConfigAppService;
            TenantId = null;
            AppConfig = _wechatAppConfigAppService.GetWechatAppConfig(TenantId).Result;
            _wechatuserRepository = wechatuserRepository;
        }

        /// <summary>
        /// 获取WeChatGroup的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<WeChatGroupListDto>> GetPagedWeChatGroups(GetWeChatGroupsInput input)
        {

            var query = _wechatgroupRepository.GetAll()
                .WhereIf(!string.IsNullOrEmpty(input.Name), g => g.TagName.Contains(input.Name));
            //TODO:根据传入的参数添加过滤条件
            var wechatgroupCount = await query.CountAsync();

            var wechatgroups = await query
                .OrderBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();

            //var wechatgroupListDtos = ObjectMapper.Map<List <WeChatGroupListDto>>(wechatgroups);
            var wechatgroupListDtos = wechatgroups.MapTo<List<WeChatGroupListDto>>();

            return new PagedResultDto<WeChatGroupListDto>(
                wechatgroupCount,
                wechatgroupListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取WeChatGroupListDto信息
        /// </summary>
        public async Task<WeChatGroupListDto> GetWeChatGroupByIdAsync(EntityDto<int> input)
        {
            var entity = await _wechatgroupRepository.GetAsync(input.Id);

            return entity.MapTo<WeChatGroupListDto>();
        }

        /// <summary>
        /// 导出WeChatGroup为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetWeChatGroupsToExcel(){
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
        public async Task<GetWeChatGroupForEditOutput> GetWeChatGroupForEdit(NullableIdDto<int> input)
        {
            var output = new GetWeChatGroupForEditOutput();
            WeChatGroupEditDto wechatgroupEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _wechatgroupRepository.GetAsync(input.Id.Value);

                wechatgroupEditDto = entity.MapTo<WeChatGroupEditDto>();

                //wechatgroupEditDto = ObjectMapper.Map<List <wechatgroupEditDto>>(entity);
            }
            else
            {
                wechatgroupEditDto = new WeChatGroupEditDto();
            }

            output.WeChatGroup = wechatgroupEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改WeChatGroup的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateWeChatGroup(CreateOrUpdateWeChatGroupInput input)
        {

            if (input.WeChatGroup.Id.HasValue)
            {
                await UpdateWeChatGroupAsync(input.WeChatGroup);
            }
            else
            {
                await CreateWeChatGroupAsync(input.WeChatGroup);
            }
        }

        /// <summary>
        /// 新增WeChatGroup
        /// </summary>
        //[AbpAuthorize(WeChatGroupAppPermissions.WeChatGroup_CreateWeChatGroup)]
        protected virtual async Task<WeChatGroupEditDto> CreateWeChatGroupAsync(WeChatGroupEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<WeChatGroup>(input);

            entity = await _wechatgroupRepository.InsertAsync(entity);
            return entity.MapTo<WeChatGroupEditDto>();
        }

        /// <summary>
        /// 编辑WeChatGroup
        /// </summary>
        //[AbpAuthorize(WeChatGroupAppPermissions.WeChatGroup_EditWeChatGroup)]
        protected virtual async Task UpdateWeChatGroupAsync(WeChatGroupEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _wechatgroupRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            await _wechatgroupRepository.UpdateAsync(entity);
        }

        /// <summary>
        /// 删除WeChatGroup信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        //[AbpAuthorize(WeChatGroupAppPermissions.WeChatGroup_DeleteWeChatGroup)]
        public async Task DeleteWeChatGroup(EntityDto<int> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _wechatgroupRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除WeChatGroup的方法
        /// </summary>
        [AbpAuthorize(WeChatGroupAppPermissions.WeChatGroup_BatchDeleteWeChatGroups)]
        public async Task BatchDeleteWeChatGroupsAsync(List<int> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _wechatgroupRepository.DeleteAsync(s => input.Contains(s.Id));
        }

        /// <summary>
        /// 获取所有分组信息
        /// </summary>
        /// <returns></returns>
        public async Task<List<WeChatGroupListDto>> GetAllWeChatGroupAsync()
        {
            var weChatGroupList =await _wechatgroupRepository.GetAllListAsync();
            return weChatGroupList.MapTo<List<WeChatGroupListDto>>();
        }

        /// <summary>
        /// 创建分组
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateWeChatGroup(WeChatGroupListDto input)
        {
            var tags = await UserTagApi.GetAsync(AppConfig.AppId);
            var group = await UserTagApi.CreateAsync(AppConfig.AppId, input.TagName);
            if (group.errcode == 0)
            {
                input.TagId = group.tag.id;
                await CreateWeChatGroupAsync(input.MapTo<WeChatGroupEditDto>());
            }
        }
        /// <summary>
        /// 修改分组
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task UpdateWeChatGroup(WeChatGroupListDto input)
        {
            var group = await UserTagApi.UpdateAsync(AppConfig.AppId, input.TagId, input.TagName);
            if (group.errcode == 0)
            {
                await UpdateWeChatGroupAsync(input.MapTo<WeChatGroupEditDto>());
            }
        }

        /// <summary>
        ///  删除分组
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task DeleteWeChatGroupAsync(WeChatGroupListDto input)
        {
            var group = await UserTagApi.DeleteAsync(AppConfig.AppId, input.TagId);
            if (group.errcode == 0)
            {
                await _wechatgroupRepository.DeleteAsync(input.Id);
            }
        }

        /// <summary>
        /// 单个标记用户分组
        /// </summary>
        /// <param name="openId"></param>
        /// <param name="tagId">标签id</param>
        /// <param name="tagName">标签名</param>
        /// <returns></returns>
        public async Task MarkWeChatGroup(string openId, int tagId)
        {
            List<string> openIds = new List<string>();
            openIds.Add(openId);
            await UserTagApi.BatchTaggingAsync(AppConfig.AppId, tagId, openIds);
        }

        /// <summary>
        /// 批量标记用户分组
        /// </summary>
        /// <returns></returns>
        public async Task BatchMarkWeChatGroup()
        {
            //try
            //{
            //}
            //catch (Exception ex)
            //{

            //}
            var weChatGroupList = await _wechatgroupRepository.GetAllListAsync();
            foreach (var item in weChatGroupList)
            {
                //if(item.TypeCode!= UserTypeEnum.消费者)
                //{
                var count = await _wechatuserRepository.GetAll().Where(g => g.UserType == item.TypeCode).Select(g => g.OpenId).CountAsync();
                if (count > 0)
                {
                    int cycleCount = count / 50 + (count % 50 == 0 ? 0 : 1);
                    for (var i = 0; i < cycleCount; i++)
                    {
                        var weChatUser = await _wechatuserRepository.GetAll().Where(g => g.UserType == item.TypeCode).Skip(i * 50).Take(50).Select(g => g.OpenId).ToListAsync();

                        var result = await UserTagApi.BatchTaggingAsync(AppConfig.AppId, item.TagId, weChatUser);
                        //if (result.errcode != 0)
                        //{
                        //    return new APIResultDto() { Code = 0, Msg = "标记失败" };
                        //}
                    }
                }
                //}
            }
            //return new APIResultDto() { Code = 0, Msg = "标记成功" };
        }

    }
}

