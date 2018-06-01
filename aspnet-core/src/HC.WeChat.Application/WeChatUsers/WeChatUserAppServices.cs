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
using Senparc.Weixin.MP.AdvancedAPIs.TemplateMessage;
using HC.WeChat.MemberConfigs;

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
        private readonly IRepository<MemberConfig, Guid> _memberconfigRepository;

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
        IWeChatGroupAppService wechatGroupAppService,
        IRepository<MemberConfig, Guid> memberconfigRepository

        )
        {
            _memberconfigRepository = memberconfigRepository;
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
                .WhereIf(!string.IsNullOrEmpty(input.UserName), u => u.UserName.Contains(input.UserName))
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
                        //发送审核通知
                        var retalilerOpenId = await _wechatuserRepository.GetAll().Where(r => r.UserId == entity.UserId).Select(v => v.OpenId).FirstOrDefaultAsync();
                        var currentName = await _wechatuserRepository.GetAll().Where(r => r.OpenId == input.OpenId).Select(v => v.NickName).FirstOrDefaultAsync();
                        await SendCheckMesssage(retalilerOpenId, input.host, currentName);                     
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

                //绑定成功后打标签
                if (result.BindStatus == BindStatusEnum.已绑定)
                {
                    await TagForWechatAsync(entity);
                }
                return new APIResultDto() { Code = 0, Msg = "绑定成功", Data = entity.MapTo<WeChatUserListDto>() };
            }
        }

        /// <summary>
        /// 发送审核通知
        /// </summary>
        /// <param name="OpenId"></param>
        /// <param name="host"></param>
        /// <param name="currentName"></param>
        /// <returns></returns>
        public async Task SendCheckMesssage(string OpenId, string host,string currentName)
        {
            try
            {             
                string appId = AppConfig.AppId;
                string openId = OpenId;
                string templateId = "qvt7CNXBY4FzfzdX54TvMUaOi9jZ3-tdsb2NRhVp0yg";//模版id  
                string url = host + "/GAWX/Authorization?page=302";
                object data = new
                {
                    first = new TemplateDataItem("店员审核通知，请您尽快审核"),
                    keyword1 = new TemplateDataItem(currentName.ToString()),
                    keyword2 = new TemplateDataItem(DateTime.Now.ToString("yyyy-MM-dd HH:mm"))
                };
                await TemplateApi.SendTemplateMessageAsync(appId, openId, templateId, url, data);
            }
            catch (Exception ex)
            {

                Logger.ErrorFormat("审核通知发送失败 error：{0} Exception：{1}", ex.Message, ex);
            }
        }

        /// <summary>
        /// 微信用户绑定成功后打标签
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        [AbpAllowAnonymous]
        public async Task TagForWechatAsync(WeChatUser entity)
        {
            try
            {
                //var weChatGroup = _wechatgroupRepository.GetAll().Where(g => g.TypeCode == entity.UserType).FirstOrDefaultAsync();
                List<string> openId_list = new List<string>();
                openId_list.Add(entity.OpenId);
                var tagId = await _wechatGroupAppService.GetTagIdAsync(entity.UserType);
                await UserTagApi.BatchTaggingAsync(AppConfig.AppId, tagId, openId_list);
            }
            catch (Exception e)
            {
                Logger.ErrorFormat("TagForWechatAsync-打标签失败:{0},Exception:{1}", e.Message, e);
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
        public async Task CheckWeChatUserBindStatusAsync(WeChatUserEditDto input)
        {
            if (input.UserType == UserTypeEnum.内部员工)
            {
                await dealMemeberConfigValueAndDesc(input);
            }
            await CancelTagAsync(input.UserType, input.OpenId);
            //input.UserType = UserTypeEnum.消费者;
            //input.BindStatus = BindStatusEnum.未绑定;
            //input.UserId = null;
            //input.UnBindTime = DateTime.Now;
            //input.Status = null;
            var entity = await _wechatuserRepository.GetAsync(input.Id.Value);
            entity.UserType = UserTypeEnum.消费者;
            entity.BindStatus = BindStatusEnum.未绑定;
            entity.UserId = null;
            entity.UnBindTime = DateTime.Now;
            entity.Status = null;
            //input.MapTo(entity);
            await _wechatuserRepository.UpdateAsync(entity);
        }

        /// <summary>
        /// 解绑移除会员配置员工信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task dealMemeberConfigValueAndDesc(WeChatUserEditDto input)
        {
            try
            {
                MemberConfig memeberConfig = await _memberconfigRepository.GetAll().Where(r => r.Code == DeployCodeEnum.通知配置 && r.Type == DeployTypeEnum.通知配置).FirstOrDefaultAsync();
                if (memeberConfig.Desc!=null||memeberConfig.Value != null)
                {
                    string newDesc = null;
                    string newValue = null;
                    if (memeberConfig.Desc != null || memeberConfig.Desc.Length != 0)
                    {
                        string[] descIds = memeberConfig.Desc.Split(',');
                        for (int i = 0; i < descIds.Length; i++)
                        {
                            if (descIds[i] != input.UserName)
                            {
                                newDesc += descIds[i] + ",";
                            }
                            else
                            {
                                descIds[i] = null;
                            }
                        }
                        if (newDesc != null)
                        {
                            newDesc = newDesc.TrimStart(',').TrimEnd(',');
                        }
                    }
                    if (memeberConfig.Value != null || memeberConfig.Value.Length != 0)
                    {
                        string[] valueIds = memeberConfig.Value.Split(',');
                        for (int i = 0; i < valueIds.Length; i++)
                        {
                            if (valueIds[i] != input.OpenId)
                            {
                                newValue += valueIds[i] + ",";
                            }
                            else
                            {
                                valueIds[i] = null;
                            }
                        }
                        if (newValue != null)
                        {
                            newValue = newValue.TrimStart(',').TrimEnd(',');
                        }
                    }
                    memeberConfig.Value = newValue;
                    memeberConfig.Desc = newDesc;
                    await _memberconfigRepository.UpdateAsync(memeberConfig);
                }
                return;
               
            }
            catch (Exception ex)
            {

                Logger.ErrorFormat("删除配置人员信息失败 error：{0} Exception：{1}", ex.Message, ex);
            }
        }
        /// 取消标签
        /// </summary>
        /// <param name="code"></param>
        /// <param name="openId"></param>
        /// <returns></returns>
        [AbpAllowAnonymous]
        public async Task CancelTagAsync(UserTypeEnum code, string openId)
        {
            try
            {
                var wechatGroup = await _wechatGroupAppService.GetWeChatGroupByUserType(code);
                if (wechatGroup != null)
                {
                    List<string> openIds = new List<string>();
                    openIds.Add(openId);
                    await _wechatGroupAppService.CancelTagAsync(wechatGroup.TagId, openIds);
                }
            }
            catch (Exception e)
            {
                Logger.ErrorFormat("取消标签失败,error:{0},Exception:{1}", e.Message, e);
            }
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
                var result = await _wechatuserRepository.GetAll().Where(w => w.UserId == userId && w.UserType == UserTypeEnum.零售客户 && w.BindStatus == BindStatusEnum.已绑定).OrderByDescending(w => w.IsShopkeeper).ToListAsync();
                return result.MapTo<List<WeChatUserListDto>>();
            }

        }

        /// <summary>
        /// 审核店员
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [AbpAllowAnonymous]
        public async Task<APIResultDto> CheckShopEmployeeAsync(WeChatUserEditDto input)
        {
            input.BindTime = DateTime.Now;
            input.Status = UserAuditStatus.已审核;
            var entity = await _wechatuserRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);
            await _wechatuserRepository.UpdateAsync(entity);
            //反馈通知
            await WXMessageToShopKeeper(input.OpenId);  
            return new APIResultDto() { Code = 0, Msg = "提交成功，我们会尽快处理" };
        }

        /// <summary>
        /// 反馈通知
        /// </summary>
        /// <param name="OpenId"></param>
        /// <returns></returns>
        public async Task WXMessageToShopKeeper(string OpenId)
        {
            try
            {
                string appId = AppConfig.AppId;
                string openId = OpenId;
                string templateId = "7I2cswoMRn0P_DsAYz-DCigntaGKJn-XUx6lMowDYRY";//模版id  
                string url = "";
                object data = new
                {
                    first = new TemplateDataItem("您所提交的店铺资料已通过审核!"),
                    keyword1 = new TemplateDataItem("审核通过"),
                    keyword2 = new TemplateDataItem(DateTime.Now.ToString("yyyy-MM-dd HH:mm"))
                };
                await TemplateApi.SendTemplateMessageAsync(appId, openId, templateId, url, data);
            }
            catch (Exception ex)
            {

                Logger.ErrorFormat("审核店员发送消息通知失败 error：{0} Exception：{1}", ex.Message, ex);
            }
        }


        /// <summary>
        /// 获取未审核店员人数
        /// </summary>
        /// <param name="tenantId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        [AbpAllowAnonymous]
        public async Task<int> GetShopEmployeesNoCheckCountAsync(int? tenantId, Guid userId)
        {
            using (CurrentUnitOfWork.SetTenantId(tenantId))
            {
                var result = await _wechatuserRepository.GetAll().Where(w => w.UserId == userId && w.UserType == UserTypeEnum.零售客户 && w.BindStatus == BindStatusEnum.已绑定 && w.Status == UserAuditStatus.未审核).CountAsync();
                return result;
            }

        }
    }
}

