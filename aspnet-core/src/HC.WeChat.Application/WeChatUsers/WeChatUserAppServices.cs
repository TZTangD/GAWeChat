using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;

using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using HC.WeChat.WeChatUsers.Dtos;
using HC.WeChat.WeChatUsers.DomainServices;
using System;
using HC.WeChat.Authorization;
using HC.WeChat.Dto;
using HC.WeChat.WechatEnums;
using HC.WeChat.Retailers;
using HC.WeChat.Employees;
using System.Linq;
using Abp.Domain.Uow;
using HC.WeChat.WeChatGroups;
using HC.WeChat.WechatAppConfigs.Dtos;
using HC.WeChat.WechatAppConfigs;
using Senparc.Weixin.MP.AdvancedAPIs;
using HC.WeChat.WeChatGroups.Dtos;
using HC.WeChat.Retailers.Dtos;
using HC.WeChat.Employees.Dtos;

namespace HC.WeChat.WeChatUsers
{
    /// <summary>
    /// WeChatUser应用层服务的接口实现方法
    /// </summary>
    //[AbpAuthorize(WeChatUserAppPermissions.WeChatUser)]
    [AbpAuthorize(AppPermissions.Pages)]
    public class WeChatUserAppService : WeChatAppServiceBase, IWeChatUserAppService
    {
        private readonly IRepository<WeChatUser, Guid> _wechatuserRepository;
        private readonly IWeChatUserManager _wechatuserManager;
        private readonly IRepository<Retailer, Guid> _retailerRepository;
        private readonly IRepository<Employee, Guid> _employeeRepository;
        private readonly IRepository<WeChatGroup, int> _wechatgroupRepository;
        public int? TenantId { get; set; }
        public WechatAppConfigInfo AppConfig { get; set; }

        IWechatAppConfigAppService _wechatAppConfigAppService;
        IWeChatGroupAppService _wechatGroupAppService;
        /// <summary>
        /// 构造函数
        /// </summary>
        public WeChatUserAppService(IRepository<WeChatUser, Guid> wechatuserRepository,
       IWeChatUserManager wechatuserManager,
       IRepository<Retailer, Guid> retailerRepository,
       IRepository<Employee, Guid> employeeRepository,
       IRepository<WeChatGroup, int> wechatgroupRepository,
       IWechatAppConfigAppService wechatAppConfigAppService,
        IWeChatGroupAppService wechatGroupAppService

        )
        {
            _wechatuserRepository = wechatuserRepository;
            _wechatuserManager = wechatuserManager;
            _retailerRepository = retailerRepository;
            _employeeRepository = employeeRepository;
            _wechatgroupRepository = wechatgroupRepository;
            _wechatAppConfigAppService = wechatAppConfigAppService;
            TenantId = null;
            AppConfig = _wechatAppConfigAppService.GetWechatAppConfig(TenantId).Result;
            _wechatGroupAppService = wechatGroupAppService;

        }

        /// <summary>
        /// 获取WeChatUser的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<WeChatUserListDto>> GetPagedWeChatUsers(GetWeChatUsersInput input)
        {

            var query = _wechatuserRepository.GetAll()
                .WhereIf(!string.IsNullOrEmpty(input.Name), u => u.NickName.Contains(input.Name) || u.UserName.Contains(input.Name))
                .WhereIf(input.UserType.HasValue, u => u.UserType == input.UserType);

            //TODO:根据传入的参数添加过滤条件
            var wechatuserCount = await query.CountAsync();

            var wechatusers = await query
                .OrderBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();

            //var wechatuserListDtos = ObjectMapper.Map<List <WeChatUserListDto>>(wechatusers);
            var wechatuserListDtos = wechatusers.MapTo<List<WeChatUserListDto>>();

            return new PagedResultDto<WeChatUserListDto>(
                wechatuserCount,
                wechatuserListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取WeChatUserListDto信息
        /// </summary>
        public async Task<WeChatUserListDto> GetWeChatUserByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _wechatuserRepository.GetAsync(input.Id);

            return entity.MapTo<WeChatUserListDto>();
        }

        /// <summary>
        /// 导出WeChatUser为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetWeChatUsersToExcel(){
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
        public async Task<GetWeChatUserForEditOutput> GetWeChatUserForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetWeChatUserForEditOutput();
            WeChatUserEditDto wechatuserEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _wechatuserRepository.GetAsync(input.Id.Value);

                wechatuserEditDto = entity.MapTo<WeChatUserEditDto>();

                //wechatuserEditDto = ObjectMapper.Map<List <wechatuserEditDto>>(entity);
            }
            else
            {
                wechatuserEditDto = new WeChatUserEditDto();
            }

            output.WeChatUser = wechatuserEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改WeChatUser的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateWeChatUser(CreateOrUpdateWeChatUserInput input)
        {

            if (input.WeChatUser.Id.HasValue)
            {
                await UpdateWeChatUserAsync(input.WeChatUser);
            }
            else
            {
                await CreateWeChatUserAsync(input.WeChatUser);
            }
        }

        /// <summary>
        /// 新增WeChatUser
        /// </summary>
        //[AbpAuthorize(WeChatUserAppPermissions.WeChatUser_CreateWeChatUser)]
        protected virtual async Task<WeChatUserEditDto> CreateWeChatUserAsync(WeChatUserEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<WeChatUser>(input);
            entity.TenantId = AbpSession.TenantId;
            entity = await _wechatuserRepository.InsertAsync(entity);
            return entity.MapTo<WeChatUserEditDto>();
        }

        /// <summary>
        /// 编辑WeChatUser
        /// </summary>
        //[AbpAuthorize(WeChatUserAppPermissions.WeChatUser_EditWeChatUser)]
        protected virtual async Task UpdateWeChatUserAsync(WeChatUserEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _wechatuserRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            await _wechatuserRepository.UpdateAsync(entity);
        }

        /// <summary>
        /// 删除WeChatUser信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        //[AbpAuthorize(WeChatUserAppPermissions.WeChatUser_DeleteWeChatUser)]
        public async Task DeleteWeChatUser(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _wechatuserRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除WeChatUser的方法
        /// </summary>
        //[AbpAuthorize(WeChatUserAppPermissions.WeChatUser_BatchDeleteWeChatUsers)]
        public async Task BatchDeleteWeChatUsersAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _wechatuserRepository.DeleteAsync(s => input.Contains(s.Id));
        }

        /// <summary>
        /// 用户绑定
        /// </summary>
        [AbpAllowAnonymous]
        public async Task<APIResultDto> BindWeChatUserAsync(UserBindDto input)
        {
            //if (string.IsNullOrEmpty(input.Phone))
            //{
            //    return new APIResultDto() { Code = 904, Msg = "绑定电话不能为空" };
            //}
            //Logger.InfoFormat("UserBindDto:", Newtonsoft.Json.Linq.JObject.FromObject(input).ToString());
            var entity = await _wechatuserManager.GetWeChatUserAsync(input.OpenId, input.TenantId);
            if (entity == null)
            {
                entity = input.MapTo<WeChatUser>();
            }
            using (CurrentUnitOfWork.SetTenantId(input.TenantId))
            {
                if (input.UserType == UserTypeEnum.零售客户)
                {
                    //验证零售户
                    var retaliler = await _retailerRepository.GetAll().Where(r => r.IsAction && r.LicenseKey == input.LicenseKey).FirstOrDefaultAsync();
                    var retalilerDto = retaliler.MapTo<RetailerListDto>();
                    if (retalilerDto != null)
                    {
                        if (retalilerDto.RetailerVerificationCode != input.VerificationCode)
                        {
                            return new APIResultDto() { Code = 901, Msg = "零售户验证未通过" };
                        }
                    }
                    else
                    {
                        return new APIResultDto() { Code = 901, Msg = "零售户验证未通过" };
                    }

                    entity.UserId = retaliler.Id;
                    entity.UserName = retaliler.Name;
                    //检查是否是第一个绑定 是为店铺管理员 不是需要店铺管理员审核
                    var isExistsBind = await _wechatuserRepository.GetAll().AnyAsync(r => r.UserId == retaliler.Id && r.UserType == UserTypeEnum.零售客户);
                    if (!isExistsBind)
                    {
                        entity.IsShopkeeper = true;
                        entity.Status = UserAuditStatus.已审核;
                    }
                    else
                    {
                        entity.IsShopkeeper = false;
                        entity.Status = UserAuditStatus.未审核;
                    }
                }
                else if (input.UserType == UserTypeEnum.内部员工)
                {
                    //验证客户经理
                    var employee = await _employeeRepository.GetAll().Where(e => e.IsAction && e.Code == input.Code).FirstOrDefaultAsync();
                    var employeeDto = employee.MapTo<EmployeeListDto>();
                    if (employeeDto != null)
                    {
                        if (employeeDto.EmployeeVerificationCode != input.VerificationCode)
                        {
                            return new APIResultDto() { Code = 902, Msg = "内部员工验证未通过" };
                        }
                    }
                    else
                    {
                        return new APIResultDto() { Code = 902, Msg = "内部员工验证未通过" };
                    }

                    entity.UserId = employee.Id;
                    entity.UserName = employee.Name;
                }
                else
                {
                    return new APIResultDto() { Code = 903, Msg = "用户类型不支持" };
                }

                //entity.UserName = input.UserName;
                entity.UserType = input.UserType;
                entity.BindStatus = BindStatusEnum.已绑定;
                entity.BindTime = DateTime.Now;
                entity.OpenId = input.OpenId;
                entity.TenantId = input.TenantId;
                var result = await _wechatuserManager.BindWeChatUserAsync(entity);
                /*
                //绑定成功后打标签
                if (result.BindStatus == BindStatusEnum.已绑定)
                {
                    var weChatGroup = _wechatgroupRepository.GetAll().Where(g => g.TypeCode == entity.UserType).FirstOrDefaultAsync();
                    List<string> openId_list = new List<string>();
                    openId_list.Add(entity.OpenId);
                    if (weChatGroup.Result != null)
                    {
                        await UserTagApi.BatchTaggingAsync(AppConfig.AppId, weChatGroup.Result.TagId, openId_list);
                    }
                    else
                    {
                        WeChatGroupListDto group = new WeChatGroupListDto();
                        group.TypeCode = entity.UserType;
                        group.TypeName = entity.UserType.ToString();
                        group.TagName = entity.UserType.ToString();
                        var resultGroup = await _wechatGroupAppService.CreateWeChatGroup(group);
                        await UserTagApi.BatchTaggingAsync(AppConfig.AppId, resultGroup.TagId, openId_list);
                    }
                }*/
                return new APIResultDto() { Code = 0, Msg = "绑定成功", Data = entity.MapTo<WeChatUserListDto>() };
            }
        }

        [AbpAllowAnonymous]
        [UnitOfWork(isTransactional: false)]
        public async Task<WeChatUserListDto> GetWeChatUserAsync(string openId, int? tenantId)
        {
            var user = await _wechatuserManager.GetWeChatUserAsync(openId, tenantId);
            var userDto = user.MapTo<WeChatUserListDto>();
            return userDto;
        }

        /// <summary>
        /// 添加或者修改WeChatUser的方法
        /// </summary>
        /// <param name="input">微信用户实体</param>
        /// <returns></returns>
        public async Task CreateOrUpdateWeChatUserDto(WeChatUserEditDto input)
        {

            if (input.Id.HasValue)
            {
                await UpdateWeChatUserAsync(input);
            }
            else
            {
                await CreateWeChatUserAsync(input);
            }
        }

        [AbpAllowAnonymous]
        public async Task<APIResultDto> BindMemberAsync(MemberBindDto input)
        {
            if (string.IsNullOrEmpty(input.Phone))
            {
                return new APIResultDto() { Code = 901, Msg = "绑定电话不能为空" };
            }
            using (CurrentUnitOfWork.SetTenantId(input.TenantId))
            {
                var entity = await _wechatuserManager.GetWeChatUserAsync(input.OpenId, input.TenantId);
                if (entity == null)
                {
                    return new APIResultDto() { Code = 902, Msg = "用户不存在" };
                }

                entity.Phone = input.Phone;
                entity.MemberBarCode = entity.MemberBarCode ?? GenerateMemberBarCode();
                if (entity.UserType == UserTypeEnum.消费者)
                {
                    entity.BindStatus = BindStatusEnum.已绑定;
                    entity.BindTime = DateTime.Now;
                }
                await _wechatuserRepository.UpdateAsync(entity);
                return new APIResultDto() { Code = 0, Msg = "绑定成功", Data = entity.MapTo<WeChatUserListDto>() };
            }
        }

        /// <summary>
        /// 生成会员卡条形码
        /// </summary>
        private string GenerateMemberBarCode()
        {
            GenerateCode gserver = new GenerateCode(0, 0);
            return gserver.nextId().ToString();
        }

        /// <summary>
        /// 获取店员信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<WeChatUserListDto>> GetPagedShopWeChatUsers(GetShopWeChatUsersInput input)
        {

            var query = _wechatuserRepository.GetAll()
                .Where(w => w.UserId == input.ShopOwnerId)
                .Where(w => w.UserType == UserTypeEnum.零售客户);

            //TODO:根据传入的参数添加过滤条件
            var wechatuserCount = await query.CountAsync();

            var wechatusers = await query
                .OrderByDescending(w => w.IsShopkeeper)
                .ThenBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();

            //var wechatuserListDtos = ObjectMapper.Map<List <WeChatUserListDto>>(wechatusers);
            var wechatuserListDtos = wechatusers.MapTo<List<WeChatUserListDto>>();

            return new PagedResultDto<WeChatUserListDto>(
                wechatuserCount,
                wechatuserListDtos
                );

        }

        [AbpAllowAnonymous]
        [UnitOfWork(isTransactional: false)]
        public async Task<WeChatUserListDto> GetWeChatUserByMemberBarCodeAsync(string memberBarCode, int? tenantId)
        {
            using (CurrentUnitOfWork.SetTenantId(tenantId))
            {
                var entity = await _wechatuserRepository.GetAll().Where(u => u.MemberBarCode == memberBarCode).FirstOrDefaultAsync();
                return entity.MapTo<WeChatUserListDto>();
            }
        }

        /// <summary>
        /// 获取单个微信用户
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="tenantId"></param>
        /// <returns></returns>
        [AbpAllowAnonymous]
        public async Task<WeChatUserListDto> GetSingleWeChatUser(Guid userId, int? tenantId)
        {
            using (CurrentUnitOfWork.SetTenantId(tenantId))
            {
                var entity = await _wechatuserRepository.GetAll().Where(w => w.UserId == userId).SingleOrDefaultAsync();
                return entity.MapTo<WeChatUserListDto>();
            }
        }

        /// <summary>
        /// 解除绑定
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [AbpAllowAnonymous]
        public async Task UpdateWeChatUserBindStatusAsync(WeChatUserEditDto input)
        {
            input.UnBindTime = DateTime.Now;
            await UpdateWeChatUserAsync(input);
        }

        /// <summary>
        /// 获取店员信息
        /// </summary>
        /// <param name="tenantId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        [AbpAllowAnonymous]
        public async Task<List<WeChatUserListDto>> GetShopEmployeesAsync(int? tenantId, Guid userId)
        {
            using (CurrentUnitOfWork.SetTenantId(tenantId))
            {
                var result = await _wechatuserRepository.GetAll().Where(w => w.UserId == userId && w.BindStatus == BindStatusEnum.已绑定).OrderByDescending(w => w.IsShopkeeper).ToListAsync();
                return result.MapTo<List<WeChatUserListDto>>();
            }

        }
        /// <summary>
        /// 审核店员
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CheckShopEmployeeAsync(WeChatUserEditDto input)
        {
            await UpdateWeChatUserAsync(input);
        }
    }
}

