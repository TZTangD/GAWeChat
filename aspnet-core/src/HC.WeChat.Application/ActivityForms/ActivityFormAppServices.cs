using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using HC.WeChat.ActivityForms.Authorization;
using HC.WeChat.ActivityForms.Dtos;
using HC.WeChat.ActivityForms.DomainServices;
using HC.WeChat.ActivityForms;
using System;
using System.Linq;
using HC.WeChat.Authorization;
using HC.WeChat.Dto;
using HC.WeChat.ActivityDeliveryInfos;
using HC.WeChat.WeChatUsers.DomainServices;
using HC.WeChat.Retailers;
using HC.WeChat.WechatEnums;
using HC.WeChat.ActivityFormLogs;
using HC.WeChat.Activities;
using HC.WeChat.Authorization.Users;
using HC.WeChat.ActivityBanquets;
using HC.WeChat.Authorization.Roles;
using HC.WeChat.WeChatUsers;
using HC.WeChat.WeChatUsers.Dtos;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using NPOI.XSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.SS.Util;
using NPOI.HSSF.Util;
using Microsoft.Extensions.Configuration;
using Abp.Domain.Uow;

namespace HC.WeChat.ActivityForms
{
    /// <summary>
    /// ActivityForm应用层服务的接口实现方法
    /// </summary>
    //[AbpAuthorize(ActivityFormAppPermissions.ActivityForm)]
    [AbpAuthorize(AppPermissions.Pages)]
    public class ActivityFormAppService : WeChatAppServiceBase, IActivityFormAppService
    {
        private readonly IRepository<ActivityForm, Guid> _activityformRepository;
        private readonly IActivityFormManager _activityformManager;
        private readonly IWeChatUserManager _wechatuserManager;
        private readonly IRetailerAppService _retailerAppService;
        private readonly IRepository<ActivityDeliveryInfo, Guid> _activitydeliveryinfoRepository;
        private readonly IRepository<ActivityFormLog, Guid> _activityFormLogRepository;
        private readonly IRepository<Activity, Guid> _activityRepository;
        private readonly IRepository<User, long> _userRepository;
        private readonly IRepository<ActivityBanquet, Guid> _activityBanquetRepository;
        private readonly IRepository<Retailer, Guid> _retailerRepository;
        private readonly IRepository<WeChatUser, Guid> _wechatuserRepository;
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IConfigurationRoot _appConfiguration;

        /// <summary>
        /// 构造函数
        /// </summary>
        public ActivityFormAppService(IRepository<ActivityForm, Guid> activityformRepository
      , IActivityFormManager activityformManager
            , IWeChatUserManager wechatuserManager
            , IRetailerAppService retailerAppService
            , IRepository<ActivityDeliveryInfo, Guid> activitydeliveryinfoRepository
            , IRepository<ActivityFormLog, Guid> activityFormLogRepository
            , IRepository<Activity, Guid> activityRepository
            , IRepository<User, long> userRepository
            , IRepository<ActivityBanquet, Guid> activityBanquetRepository
            , IRepository<Retailer, Guid> retailerRepository
            , IRepository<WeChatUser, Guid> wechatuserRepository
            , IHostingEnvironment hostingEnvironment
        )
        {
            _activityformRepository = activityformRepository;
            _activityformManager = activityformManager;
            _wechatuserManager = wechatuserManager;
            _retailerAppService = retailerAppService;
            _activitydeliveryinfoRepository = activitydeliveryinfoRepository;
            _activityFormLogRepository = activityFormLogRepository;
            _activityRepository = activityRepository;
            _userRepository = userRepository;
            _activityBanquetRepository = activityBanquetRepository;
            _retailerRepository = retailerRepository;
            _wechatuserRepository = wechatuserRepository;
            _hostingEnvironment = hostingEnvironment;
        }

        /// <summary>
        /// 获取ActivityForm的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<ActivityFormListDto>> GetPagedActivityForms(GetActivityFormsInput input)
        {
            var mid = UserManager.GetControlEmployeeId();
            var query = _activityformRepository.GetAll()
                .WhereIf(!string.IsNullOrEmpty(input.FormCode), q => q.FormCode == input.FormCode)
                .WhereIf(input.BeginDate.HasValue, q => q.CreationTime >= input.BeginDate)
                .WhereIf(input.EndDate.HasValue, q => q.CreationTime < input.EndDateOne)
                .WhereIf(input.Status.HasValue, q => q.Status == input.Status)
                .WhereIf(mid.HasValue, q => q.ManagerId == mid) //数据权限过滤
                .WhereIf(!string.IsNullOrEmpty(input.Filter), q => q.ActivityName.Contains(input.Filter)
                || q.RetailerName.Contains(input.Filter) || q.ManagerName.Contains(input.Filter));
            //TODO:根据传入的参数添加过滤条件
            var activityformCount = await query.CountAsync();

            var activityforms = await query
                .OrderByDescending(q => q.CreationTime)
                .PageBy(input)
                .ToListAsync();

            //var activityformListDtos = ObjectMapper.Map<List <ActivityFormListDto>>(activityforms);
            var activityformListDtos = activityforms.MapTo<List<ActivityFormListDto>>();

            return new PagedResultDto<ActivityFormListDto>(
                activityformCount,
                activityformListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取ActivityFormListDto信息
        /// </summary>
        public async Task<ActivityFormListDto> GetActivityFormByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _activityformRepository.GetAsync(input.Id);

            var result = entity.MapTo<ActivityFormListDto>();

            var logs = await _activityFormLogRepository.GetAll()
                .Where(l => l.ActivityFormId == input.Id)
                .OrderBy(l => l.ActionTime).ToListAsync();
            result.CurrentStep = logs.Count();

            result.FormLogList = logs.MapTo<List<ActivityFormLogDto>>();

            switch (entity.Status)
            {
                case FormStatusEnum.提交申请:
                    {
                        result.FormLogList.Add(new ActivityFormLogDto()
                        {
                            Status = FormStatusEnum.初审通过,
                            StatusName = FormStatusEnum.初审通过.ToString()
                        });

                        result.FormLogList.Add(new ActivityFormLogDto()
                        {
                            Status = FormStatusEnum.资料回传已审核,
                            StatusName = FormStatusEnum.资料回传已审核.ToString()
                        });

                        result.FormLogList.Add(new ActivityFormLogDto()
                        {
                            Status = FormStatusEnum.营销中心已审核,
                            StatusName = FormStatusEnum.营销中心已审核.ToString()
                        });
                    }
                    break;
                case FormStatusEnum.初审通过:
                    {
                        result.FormLogList.Add(new ActivityFormLogDto()
                        {
                            Status = FormStatusEnum.资料回传已审核,
                            StatusName = FormStatusEnum.资料回传已审核.ToString()
                        });

                        result.FormLogList.Add(new ActivityFormLogDto()
                        {
                            Status = FormStatusEnum.营销中心已审核,
                            StatusName = FormStatusEnum.营销中心已审核.ToString()
                        });
                    }
                    break;
                case FormStatusEnum.资料回传已审核:
                    {
                        result.FormLogList.Add(new ActivityFormLogDto()
                        {
                            Status = FormStatusEnum.营销中心已审核,
                            StatusName = FormStatusEnum.营销中心已审核.ToString()
                        });
                    }
                    break;
            }

            return result;
        }

        /// <summary>
        /// 导出ActivityForm为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetActivityFormsToExcel(){
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
        public async Task<GetActivityFormForEditOutput> GetActivityFormForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetActivityFormForEditOutput();
            ActivityFormEditDto activityformEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _activityformRepository.GetAsync(input.Id.Value);

                activityformEditDto = entity.MapTo<ActivityFormEditDto>();

                //activityformEditDto = ObjectMapper.Map<List <activityformEditDto>>(entity);
            }
            else
            {
                activityformEditDto = new ActivityFormEditDto();
            }

            output.ActivityForm = activityformEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改ActivityForm的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateActivityForm(CreateOrUpdateActivityFormInput input)
        {

            if (input.ActivityForm.Id.HasValue)
            {
                await UpdateActivityFormAsync(input.ActivityForm);
            }
            else
            {
                await CreateActivityFormAsync(input.ActivityForm);
            }
        }

        /// <summary>
        /// 新增ActivityForm
        /// </summary>
        //[AbpAuthorize(ActivityFormAppPermissions.ActivityForm_CreateActivityForm)]
        protected virtual async Task<ActivityFormEditDto> CreateActivityFormAsync(ActivityFormEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<ActivityForm>(input);

            entity = await _activityformRepository.InsertAsync(entity);
            return entity.MapTo<ActivityFormEditDto>();
        }

        /// <summary>
        /// 编辑ActivityForm
        /// </summary>
        //[AbpAuthorize(ActivityFormAppPermissions.ActivityForm_EditActivityForm)]
        protected virtual async Task UpdateActivityFormAsync(ActivityFormEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _activityformRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            await _activityformRepository.UpdateAsync(entity);
        }

        /// <summary>
        /// 删除ActivityForm信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        //[AbpAuthorize(ActivityFormAppPermissions.ActivityForm_DeleteActivityForm)]
        public async Task DeleteActivityForm(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _activityformRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除ActivityForm的方法
        /// </summary>
        //[AbpAuthorize(ActivityFormAppPermissions.ActivityForm_BatchDeleteActivityForms)]
        public async Task BatchDeleteActivityFormsAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _activityformRepository.DeleteAsync(s => input.Contains(s.Id));
        }

        [AbpAllowAnonymous]
        public async Task<APIResultDto> SubmitActivityFormAsync(ActivityFormInputDto input)
        {
            var form = input.MapTo<ActivityForm>();//表单信息
            var delivery = input.MapTo<ActivityDeliveryInfo>();//收货信息

            var user = await _wechatuserManager.GetWeChatUserAsync(input.OpenId, input.TenantId);

            if (user == null)
            {
                return new APIResultDto() { Code = 701, Msg = "当前用户无效" };
            }

            if (user.UserType != UserTypeEnum.零售客户 && user.UserType != UserTypeEnum.客户经理)
            {
                return new APIResultDto() { Code = 702, Msg = "当前用户类型不支持" };
            }

            form.CreationUser = user.UserName;
            form.CreationId = user.UserId;
            using (CurrentUnitOfWork.SetTenantId(input.TenantId))
            {
                var activity = await _activityRepository.GetAsync(input.ActivityId);

                if (user.UserType == UserTypeEnum.零售客户)
                {
                    //单数限制
                    var rcount = _activityformRepository.GetAll()
                        .Where(a => a.RetailerId == user.UserId
                        && a.Status == FormStatusEnum.提交申请
                        && a.Status == FormStatusEnum.初审通过
                        && a.Status == FormStatusEnum.资料回传已审核
                        && a.CreationUser == user.UserName).Count();
                    if (rcount >= activity.RUnfinished)
                    {
                        return new APIResultDto() { Code = 703, Msg = string.Format("零售客户未完成单数不能超过{0}单，不能再申请", activity.RUnfinished) };
                    }

                    form.RetailerId = user.UserId.Value;
                    form.RetailerName = user.UserName;
                    var retailer = await _retailerAppService.GetRetailerByIdAsync(new EntityDto<Guid> { Id = user.UserId.Value });
                    form.ManagerName = retailer.Manager;
                    form.ManagerId = retailer.EmployeeId;
                    form.Status = FormStatusEnum.提交申请;
                }
                else if (user.UserType == UserTypeEnum.客户经理)
                {
                    //单数限制
                    var mcount = _activityformRepository.GetAll()
                        .Where(a => a.ManagerId == user.UserId
                        && a.Status == FormStatusEnum.提交申请
                        && a.Status == FormStatusEnum.初审通过
                        && a.Status == FormStatusEnum.资料回传已审核
                        && a.CreationUser == user.UserName).Count();

                    if (mcount >= activity.MUnfinished)
                    {
                        return new APIResultDto() { Code = 704, Msg = string.Format("客户经理未完成单数不能超过{0}单，不能再申请", activity.MUnfinished) };
                    }
                    form.ManagerName = user.UserName;
                    form.ManagerId = user.UserId;
                    form.Status = FormStatusEnum.初审通过;
                }

                form.FormCode = GetFormCode();

                form.ActivityName = activity.Name;
                //1、保存表单
                var formId = await _activityformRepository.InsertAndGetIdAsync(form);
                await CurrentUnitOfWork.SaveChangesAsync();//获取保存的Form ID
                delivery.ActivityFormId = formId;
                delivery.CreationTime = DateTime.Now;
                delivery.Type = DeliveryUserTypeEnum.消费者;
                //2、保存邮寄信息
                await _activitydeliveryinfoRepository.InsertAsync(delivery);

                //3、保存记录日志
                var log = new ActivityFormLog();
                log.ActionTime = DateTime.Now;
                log.ActivityFormId = formId;
                log.Opinion = "提交申请";
                log.Status = FormStatusEnum.提交申请;
                log.StatusName = log.Status.ToString();
                log.UserId = user.UserId.Value;
                log.UserName = user.UserName;
                log.UserType = user.UserType;

                await _activityFormLogRepository.InsertAsync(log);

                //如果是客户经理提交 为初审通过 2018-4-10
                if (form.Status == FormStatusEnum.初审通过)
                {
                    var log2 = new ActivityFormLog();
                    log2.ActionTime = DateTime.Now.AddSeconds(5);
                    log2.ActivityFormId = formId;
                    log2.Opinion = "初审通过";
                    log2.Status = FormStatusEnum.初审通过;
                    log2.StatusName = log2.Status.ToString();
                    log2.UserId = user.UserId.Value;
                    log2.UserName = user.UserName;
                    log2.UserType = user.UserType;

                    await _activityFormLogRepository.InsertAsync(log2);
                }

                if (user.UserType == UserTypeEnum.零售客户)
                {
                    return new APIResultDto() { Code = 0, Msg = "活动申请成功，待客户经理审核" };
                }
                else
                {
                    return new APIResultDto() { Code = 0, Msg = "活动申请成功" };
                }
            }
        }

        private string GetFormCode()
        {
            GenerateCode gserver = new GenerateCode(0, 0);
            string code = "YA" + gserver.nextId().ToString();
            return code;
        }

        [AbpAllowAnonymous]
        public async Task<APIResultDto> ChangeActivityFormStatusAsync(ActivityFormStatusDto input)
        {
            var form = await _activityformRepository.GetAsync(input.Id);
            var user = await _userRepository.GetAsync(AbpSession.UserId.Value);
            //更新状态
            form.Status = input.Status;
            //更新日志
            var log = new ActivityFormLog();
            log.ActionTime = DateTime.Now;
            log.ActivityFormId = form.Id;
            log.Opinion = input.Opinion;
            log.Status = input.Status;
            log.StatusName = input.Status.ToString();
            log.UserId = user.EmployeeId;
            log.UserName = user.Name;

            var roles = await UserManager.GetRolesAsync(user);
            if (roles.Contains("CustomerManager"))
            {
                log.UserType = UserTypeEnum.客户经理;
            }
            else
            {
                log.UserType = UserTypeEnum.营销中心;
            }

            //log.UserType = user.EmployeeId.HasValue ? UserTypeEnum.客户经理 : UserTypeEnum.营销中心;

            await _activityformRepository.UpdateAsync(form);
            await _activityFormLogRepository.InsertAsync(log);

            return new APIResultDto() { Code = 0, Msg = "操作成功" };
        }

        public Task<PagedResultDto<ActivityViewDto>> GetPagedActivityView(GetActivityViewInput input)
        {
            var query = from f in _activityformRepository.GetAll()
                        join b in _activityBanquetRepository.GetAll()
                        on f.Id equals b.ActivityFormId
                        where f.Status == FormStatusEnum.营销中心已审核
                        select new
                        {
                            b.Area,
                            f.ManagerId,
                            f.ManagerName,
                            f.ActivityGoodsId,
                            f.GoodsSpecification,
                            f.ActivityId,
                            f.CreationTime,
                            f.Num
                        };
            var mid = UserManager.GetControlEmployeeId();
            //var dlist = query.ToList();
            var queryfilter = query.WhereIf(!string.IsNullOrEmpty(input.ActivityArea), q => q.Area == input.ActivityArea)
                                   .WhereIf(!string.IsNullOrEmpty(input.ManagerName), q => q.ManagerName == input.ManagerName)
                                   .WhereIf(!string.IsNullOrEmpty(input.GoodsSpecification), q => q.GoodsSpecification == input.GoodsSpecification)
                                   .WhereIf(input.BeginDate.HasValue, q => q.CreationTime >= input.BeginDate)
                                   .WhereIf(input.EndDate.HasValue, q => q.CreationTime < input.EndDateOne)
                                   .WhereIf(mid.HasValue, q => q.ManagerId == mid); //数据权限过滤;

            //var d2 = queryfilter.ToList();
            //第一次分组求活动场次
            var groupOne = from q in queryfilter
                           group q by new { q.Area, q.ActivityId, q.GoodsSpecification, q.ManagerId, q.ManagerName }
                           into g
                           select new
                           {
                               g.Key.Area,
                               g.Key.ActivityId,
                               g.Key.GoodsSpecification,
                               g.Key.ManagerId,
                               g.Key.ManagerName,
                               num = g.Sum(a => a.Num)
                           };
            //var d3 = groupOne.ToList();
            //第二次分组求最终结果
            var groupTwo = from t in groupOne
                           group t by new { t.Area, t.GoodsSpecification, t.ManagerId, t.ManagerName }
                           into gt
                           select new ActivityViewDto
                           {
                               Area = gt.Key.Area,
                               GoodsSpecification = gt.Key.GoodsSpecification,
                               ManagerName = gt.Key.ManagerName,
                               OpenNum = gt.Count(),
                               GoodsNum = gt.Sum(g => g.num)
                           };
            //var d4 = groupTwo.ToList();

            var dataCount = groupTwo.Count();

            //var dataCount = await groupTwo.CountAsync();

            //var dataList = await groupTwo.OrderBy(g => g.Area)
            //    .ThenBy(g => g.GoodsSpecification)
            //    .ThenBy(g => g.ManagerName)
            //    .PageBy(input)
            //    .ToListAsync();

            var dataList = groupTwo.OrderBy(g => g.Area)
                .ThenBy(g => g.GoodsSpecification)
                .ThenBy(g => g.ManagerName)
                .PageBy(input)
                .ToList();

            return Task.FromResult(new PagedResultDto<ActivityViewDto>(dataCount, dataList));
        }

        /// <summary>
        /// 获取首页的数据
        /// </summary>
        public async Task<ActivityFormCountInfoDto> GetHomeInfo()
        {
            var dto = new ActivityFormCountInfoDto();
            var query = _activityformRepository.GetAll();
            var WeiChatquery = _wechatuserRepository.GetAll();
            var mid = UserManager.GetControlEmployeeId();

            dto.CheckCount = await query.WhereIf(mid.HasValue, q => q.ManagerId == mid).Where(f => f.Status == FormStatusEnum.提交申请
            || f.Status == FormStatusEnum.初审通过
            || f.Status == FormStatusEnum.资料回传已审核).CountAsync();
            dto.IsCheckedCount = query.Count();
            dto.GoodsCount = await query.WhereIf(mid.HasValue, q => q.ManagerId == mid).Where(f => f.Status == FormStatusEnum.提交申请
            || f.Status == FormStatusEnum.初审通过
            || f.Status == FormStatusEnum.资料回传已审核
            || f.Status == FormStatusEnum.营销中心已审核).SumAsync(s => s.Num);
            dto.WeiChatAttention = await WeiChatquery.Where(w => w.UserType != UserTypeEnum.取消关注).CountAsync();
            return dto;
        }

        /// <summary>
        /// 获取活动申请单列表以及单数
        /// </summary>
        /// <returns></returns>
        [AbpAllowAnonymous]
        public async Task<ActivityFormForWechat> GetActivityFormList(bool check, WeChatUserListDto user)
        {
            using (CurrentUnitOfWork.SetTenantId(user.TenantId))
            {
                var query = _activityformRepository.GetAll()
                .WhereIf(user.UserType == UserTypeEnum.客户经理, a => a.ManagerId == user.UserId)
                .WhereIf(user.UserType == UserTypeEnum.零售客户, a => a.CreationId == user.UserId)
                .WhereIf(check, a => a.Status == FormStatusEnum.营销中心已审核)
                .WhereIf(!check, a => a.Status == FormStatusEnum.初审通过 || a.Status == FormStatusEnum.提交申请 || a.Status == FormStatusEnum.资料回传已审核)
                .OrderByDescending(a => a.CreationTime);
                ActivityFormForWechat result = new ActivityFormForWechat();
                if (check)
                {
                    result.ActivityFormListDtos = query.Take(30).MapTo<List<ActivityFormListDto>>();
                }
                else
                {
                    result.ActivityFormListDtos = query.MapTo<List<ActivityFormListDto>>();
                }
                result.Count = await query.CountAsync();
                return result.MapTo<ActivityFormForWechat>();
            }
        }

        /// <summary>
        /// 获取单条活动申请单数据
        /// </summary>
        /// <param name="id">活动申请单id</param>
        /// <returns></returns>
        [AbpAllowAnonymous]
        public ActivityFormListDto GetSingleFormDto(Guid id)
        {
            var query = _activityformRepository.GetAll().Where(a => a.Id == id).FirstOrDefault();
            return query.MapTo<ActivityFormListDto>();
        }

        /// <summary>
        /// 针对微信端的取消，初审通过
        /// </summary>
        /// <param name="input"></param>
        /// <param name="tenantId"></param>
        /// <returns></returns>
        [AbpAllowAnonymous]
        public async Task<APIResultDto> ChangeActivityFormStatusWeChatAsync(ActivityFromStatusDtoss input)
        {
            using (CurrentUnitOfWork.SetTenantId(input.TenantId))
            {
                var form = await _activityformRepository.GetAsync(input.Id);
                var user = await _wechatuserManager.GetWeChatUserAsync(input.OpenId, input.TenantId);
                //var user = await _userRepository.GetAsync(AbpSession.UserId.Value);
                //更新状态
                form.Status = input.Status;
                //更新日志
                var log = new ActivityFormLog();
                log.ActionTime = DateTime.Now;
                log.ActivityFormId = form.Id;
                log.Opinion = string.IsNullOrEmpty(input.Opinion) ? input.Status.ToString() : input.Opinion;
                log.Status = input.Status;
                log.StatusName = input.Status.ToString();
                log.UserId = user.UserId;
                log.UserName = user.UserName;

                //var roles = await UserManager.GetRolesAsync(user);
                //if (roles.Contains("CustomerManager"))
                //{
                //    log.UserType = UserTypeEnum.客户经理;
                //}
                //else
                //{
                //    log.UserType = UserTypeEnum.营销中心;
                //}
                log.UserType = user.UserType;

                await _activityformRepository.UpdateAsync(form);
                await _activityFormLogRepository.InsertAsync(log);

                return new APIResultDto() { Code = 0, Msg = "操作成功" };
            }
        }

        [AbpAllowAnonymous]
        public async Task<ActivityFormCountDto> GetActivityFormCountByUserAsync(WeChatUserListDto user)
        {
            using (CurrentUnitOfWork.SetTenantId(user.TenantId))
            {
                ActivityFormCountDto countDto = new ActivityFormCountDto();
                switch (user.UserType)
                {
                    case UserTypeEnum.零售客户:
                        {
                            countDto.OutstandingCount = await _activityformRepository.GetAll()
                                                            .Where(a => a.CreationId == user.UserId)
                                                            .Where(a => a.Status == FormStatusEnum.提交申请
                                                            || a.Status == FormStatusEnum.初审通过
                                                            || a.Status == FormStatusEnum.资料回传已审核).CountAsync();
                            countDto.CompletedCount = await _activityformRepository.GetAll().Where(a => a.CreationId == user.UserId && a.Status == FormStatusEnum.营销中心已审核).CountAsync();
                        }
                        break;
                    case UserTypeEnum.客户经理:
                        {
                            countDto.OutstandingCount = await _activityformRepository.GetAll()
                                                            .Where(a => a.ManagerId == user.UserId)
                                                            .Where(a => a.Status == FormStatusEnum.提交申请
                                                            || a.Status == FormStatusEnum.初审通过
                                                            || a.Status == FormStatusEnum.资料回传已审核).CountAsync();
                            countDto.CompletedCount = await _activityformRepository.GetAll().Where(a => a.ManagerId == user.UserId && a.Status == FormStatusEnum.营销中心已审核).CountAsync();
                        }
                        break;
                    default:
                        break;
                }

                return countDto;
            }
        }

        /// <summary>
        /// 邮寄信息
        /// </summary>
        /// <param name="input">查询条件</param>
        /// <returns></returns>
        [UnitOfWork(isTransactional: false)]
        public Task<PagedResultDto<PostInfoDto>> GetPostInfo(GetActivityFormsSentInput input)
        {
            var mid = UserManager.GetControlEmployeeId();
            var queryForm = _activityformRepository.GetAll()
                .WhereIf(!string.IsNullOrEmpty(input.FormCode), q => q.FormCode == input.FormCode)
                .WhereIf(input.StartTime.HasValue, q => q.CreationTime >= input.StartTime)
                .WhereIf(input.EndTime.HasValue, q => q.CreationTime < input.EndDateOne)
                .Where(q => q.Status != FormStatusEnum.取消 && q.Status != FormStatusEnum.拒绝)
                .WhereIf(mid.HasValue, q => q.ManagerId == mid) //数据权限过滤
                .WhereIf(!string.IsNullOrEmpty(input.ProductSpecification), q => q.GoodsSpecification.Contains(input.ProductSpecification));

            //.OrderByDescending(q=>q.CreationTime);
            var queryDelivery = _activitydeliveryinfoRepository.GetAll()
                .WhereIf(input.UserType.HasValue, d => d.Type == input.UserType)
                .WhereIf(!string.IsNullOrEmpty(input.Name), d => d.UserName.Contains(input.Name))
                .WhereIf(!string.IsNullOrEmpty(input.Phone), d => d.Phone.Contains(input.Phone))
                .WhereIf(input.IsSend.HasValue, d => d.IsSend == input.IsSend);

            var queryBanquet = _activityBanquetRepository.GetAll();
            //.WhereIf(!string.IsNullOrEmpty(input.AreaSe), b => b.Area == input.AreaSe);

            var query = from f in queryForm
                        join d in queryDelivery on f.Id equals d.ActivityFormId
                        //from fd in queryF.DefaultIfEmpty()
                        join b in queryBanquet on f.Id equals b.ActivityFormId into queryB
                        from fb in queryB.DefaultIfEmpty()
                        select new PostInfoDto()
                        {
                            FormCode = f.FormCode,
                            CreationTime = f.CreationTime,
                            Area = fb.Area,
                            GoodsSpecification = f.GoodsSpecification,
                            Num = f.Num,
                            UserName = d.UserName,
                            Type = d.Type,
                            Address = d.Address,
                            Phone = d.Phone,
                            IsSend = d.IsSend,
                            Id = d.Id,
                            SendTime = d.SendTime,
                            ActivityFormId = d.ActivityFormId
                        };

            //TODO:根据传入的参数添加过滤条件
            var activityformCount = query.WhereIf(!string.IsNullOrEmpty(input.AreaSe), b => b.Area == input.AreaSe).Count();
            //if (activityformCount>0) {
            //    query = query.OrderByDescending(q => q.ApplyTime);
            //}
            var activityforms = query
                .WhereIf(!string.IsNullOrEmpty(input.AreaSe), b => b.Area == input.AreaSe)
                .OrderByDescending(q=>q.Area)
                .ThenByDescending(q => q.CreationTime)
                .ThenBy(q => q.FormCode)
                .ThenBy(q => q.Type)
                .Skip(input.SkipCount).Take(input.MaxResultCount)
                //.PageBy(input)
                .ToList();
            //.ToListAsync();

            //var activityformListDtos = ObjectMapper.Map<List <ActivityFormListDto>>(activityforms);
            var activityformListDtos = activityforms.MapTo<List<PostInfoDto>>();

            return Task.FromResult(new PagedResultDto<PostInfoDto>(
                activityformCount,
                activityformListDtos
                ));
        }

        [UnitOfWork(isTransactional: false)]
        public Task<APIResultDto> ExportPostInfoExcel(GetActivityFormsSentInput input)
        {
            try
            {
                var exportData = GetPostInfoToExcelList(input);
                var result = new APIResultDto();
                result.Code = 0;
                result.Data = SavePostInfoExcel("邮寄信息.xlsx", exportData);
                return Task.FromResult(result);
            }
            catch (Exception ex)
            {
                Logger.ErrorFormat("ExportPostInfoExcel errormsg:{0} Exception:{1}", ex.Message, ex);
                return Task.FromResult(new APIResultDto() { Code = 901, Msg = "网络忙... 请待会重试！" });
            }
           
        }

        private string GetSavePath()
        {
            var fileDire = _hostingEnvironment.WebRootPath + @"\files\downloadtemp\";
            if (!Directory.Exists(fileDire))
            {
                Directory.CreateDirectory(fileDire);
            }
            return fileDire;
        }


        private void SetCell(ICell cell, IFont font, string value)
        {
            cell.CellStyle.SetFont(font);
            cell.SetCellValue(value);
        }

        private void SetCell(ICell cell, IFont font, int value)
        {
            cell.CellStyle.SetFont(font);
            cell.SetCellValue(value);
        }

        private void SetCell(ICell cell, IFont font, DateTime value)
        {
            cell.CellStyle.SetFont(font);
            cell.SetCellValue(value);
        }

        private string SavePostInfoExcel(string fileName, List<PostInfoDtoToExcel> data)
        {
            var fullPath = GetSavePath() + fileName;
            using (var fs = new FileStream(fullPath, FileMode.Create, FileAccess.Write))
            {
                IWorkbook workbook = new XSSFWorkbook();
                ISheet sheet = workbook.CreateSheet("邮寄信息");
                var rowIndex = 0;
                IRow titleRow = sheet.CreateRow(rowIndex);
                string[] titles = { "序号", "区县", "活动单号", "活动名称", "零售客户", "客户经理", "用烟规格", "申请数量", "申请理由", "状态", "申请时间", "消费者姓名", "邮寄地址", "联系方式", "消费者奖品是否邮寄", "推荐人姓名", "邮寄地址", "联系方式", "推荐人奖品是否邮寄" };
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
                    SetCell(row.CreateCell(0), font, rowIndex);
                    SetCell(row.CreateCell(1), font, item.Area);
                    SetCell(row.CreateCell(2), font, item.FormCode);
                    SetCell(row.CreateCell(3), font, item.ActivityName);
                    SetCell(row.CreateCell(4), font, item.RetailerName);
                    SetCell(row.CreateCell(5), font, item.ManagerName);
                    SetCell(row.CreateCell(6), font, item.GoodsSpecification);
                    SetCell(row.CreateCell(7), font, item.Num);
                    SetCell(row.CreateCell(8), font, item.Reason);
                    SetCell(row.CreateCell(9), font, item.StatusName);
                    SetCell(row.CreateCell(10), font, item.CreationTime.ToString("yyyy-MM-dd"));
                    SetCell(row.CreateCell(11), font, item.UserName);
                    SetCell(row.CreateCell(12), font, item.Address);
                    SetCell(row.CreateCell(13), font, item.Phone);
                    SetCell(row.CreateCell(14), font, item.IsSendName);
                    SetCell(row.CreateCell(15), font, item.TUserName);
                    SetCell(row.CreateCell(16), font, item.TAddress);
                    SetCell(row.CreateCell(17), font, item.TPhone);
                    SetCell(row.CreateCell(18), font, item.TIsSendName);
                }

                workbook.Write(fs);
            }
            return "/files/downloadtemp/" + fileName;
        }
        
        private List<PostInfoDtoToExcel> GetPostInfoToExcelList(GetActivityFormsSentInput input)
        {
            var mid = UserManager.GetControlEmployeeId();
            //表单
            var queryForm = _activityformRepository.GetAll()
                .WhereIf(!string.IsNullOrEmpty(input.FormCode), q => q.FormCode == input.FormCode)
                .WhereIf(input.StartTime.HasValue, q => q.CreationTime >= input.StartTime)
                .WhereIf(input.EndTime.HasValue, q => q.CreationTime < input.EndDateOne)
                .Where(q => q.Status != FormStatusEnum.取消 && q.Status != FormStatusEnum.拒绝)
                .WhereIf(mid.HasValue, q => q.ManagerId == mid) //数据权限过滤
                .WhereIf(!string.IsNullOrEmpty(input.ProductSpecification), q => q.GoodsSpecification.Contains(input.ProductSpecification));
           
            //宴席
            var queryBanquet = _activityBanquetRepository.GetAll();

            if (!input.UserType.HasValue)
            {
                //消费者
                var queryDelivery = _activitydeliveryinfoRepository.GetAll()
                    .Where(q => q.Type == DeliveryUserTypeEnum.消费者);
                //.WhereIf(!string.IsNullOrEmpty(input.Name), d => d.UserName.Contains(input.Name))
                //.WhereIf(!string.IsNullOrEmpty(input.Phone), d => d.Phone.Contains(input.Phone))
                //.WhereIf(input.IsSend.HasValue, d => d.IsSend == input.IsSend);
                //推荐人
                var queryTDelivery = _activitydeliveryinfoRepository.GetAll()
                   .Where(q => q.Type == DeliveryUserTypeEnum.推荐人);
                   //.WhereIf(!string.IsNullOrEmpty(input.Name), d => d.UserName.Contains(input.Name))
                   //.WhereIf(!string.IsNullOrEmpty(input.Phone), d => d.Phone.Contains(input.Phone))
                   //.WhereIf(input.IsSend.HasValue, d => d.IsSend == input.IsSend);

                var query = from f in queryForm
                            join d in queryDelivery on f.Id equals d.ActivityFormId into queryd
                            from fd in queryd.DefaultIfEmpty()
                            join t in queryTDelivery on f.Id equals t.ActivityFormId into queryt
                            from ft in queryt.DefaultIfEmpty()
                            join b in queryBanquet on f.Id equals b.ActivityFormId into queryb
                            from fb in queryb.DefaultIfEmpty()
                            select new PostInfoDtoToExcel()
                            {
                                Area = fb.Area,
                                //Area = (fb == null? "" : fb.Area),
                                FormCode = f.FormCode,
                                ActivityName = f.ActivityName,
                                RetailerName = f.RetailerName,
                                ManagerName = f.ManagerName,
                                GoodsSpecification = f.GoodsSpecification,
                                Num = f.Num,
                                Reason = f.Reason,
                                Status = f.Status,
                                CreationTime = f.CreationTime,
                                UserName = fd.UserName,
                                Address = fd.Address,
                                Phone = fd.Phone,
                                IsSend = fd.IsSend,
                                TUserName = ft.UserName,
                                TAddress = ft.Address,
                                TPhone = ft.Phone,
                                TIsSend = ft.IsSend
                                //TUserName = (ft == null? "" : ft.UserName),
                                //TAddress = (ft == null ? "" : ft.Address),
                                //TPhone = (ft == null ? "" : ft.Phone),
                                //TIsSend = (ft == null ? false : ft.IsSend)
                            };

                var dataList = query
                   .WhereIf(!string.IsNullOrEmpty(input.AreaSe), b => b.Area == input.AreaSe)
                   .WhereIf(!string.IsNullOrEmpty(input.Name), d => d.UserName.Contains(input.Name) || d.TUserName.Contains(input.Name))
                   .WhereIf(!string.IsNullOrEmpty(input.Phone), d => d.Phone.Contains(input.Phone) || d.TPhone.Contains(input.Phone))
                   .WhereIf(input.IsSend.HasValue, d => d.IsSend == input.IsSend || d.TIsSend == input.IsSend)
                   .OrderByDescending(q => q.Area)
                   .ThenBy(q => q.CreationTime)
                   .ToList();
                return dataList;
            }

            if (input.UserType == DeliveryUserTypeEnum.消费者)
            {
                //消费者
                var queryDelivery = _activitydeliveryinfoRepository.GetAll()
                    .Where(q => q.Type == DeliveryUserTypeEnum.消费者);

                var query = from f in queryForm
                            join d in queryDelivery on f.Id equals d.ActivityFormId into queryd
                            from fd in queryd.DefaultIfEmpty()
                            join b in queryBanquet on f.Id equals b.ActivityFormId into queryb
                            from fb in queryb.DefaultIfEmpty()
                            select new PostInfoDtoToExcel()
                            {
                                Area = fb.Area,
                                //Area = (fb == null? "" : fb.Area),
                                FormCode = f.FormCode,
                                ActivityName = f.ActivityName,
                                RetailerName = f.RetailerName,
                                ManagerName = f.ManagerName,
                                GoodsSpecification = f.GoodsSpecification,
                                Num = f.Num,
                                Reason = f.Reason,
                                Status = f.Status,
                                CreationTime = f.CreationTime,
                                UserName = fd.UserName,
                                Address = fd.Address,
                                Phone = fd.Phone,
                                IsSend = fd.IsSend
                            };

                var dataList = query
                   .WhereIf(!string.IsNullOrEmpty(input.AreaSe), b => b.Area == input.AreaSe)
                   .WhereIf(!string.IsNullOrEmpty(input.Name), d => d.UserName.Contains(input.Name))
                   .WhereIf(!string.IsNullOrEmpty(input.Phone), d => d.Phone.Contains(input.Phone))
                   .WhereIf(input.IsSend.HasValue, d => d.IsSend == input.IsSend)
                   .OrderByDescending(q => q.Area)
                   .ThenBy(q => q.CreationTime)
                   .ToList();
                return dataList;
            }

            if (input.UserType == DeliveryUserTypeEnum.推荐人)
            {
                //推荐人
                var queryTDelivery = _activitydeliveryinfoRepository.GetAll()
                   .Where(q => q.Type == DeliveryUserTypeEnum.推荐人);

                var query = from f in queryForm
                            join t in queryTDelivery on f.Id equals t.ActivityFormId into queryt
                            from ft in queryt.DefaultIfEmpty()
                            join b in queryBanquet on f.Id equals b.ActivityFormId into queryb
                            from fb in queryb.DefaultIfEmpty()
                            select new PostInfoDtoToExcel()
                            {
                                Area = fb.Area,
                                //Area = (fb == null? "" : fb.Area),
                                FormCode = f.FormCode,
                                ActivityName = f.ActivityName,
                                RetailerName = f.RetailerName,
                                ManagerName = f.ManagerName,
                                GoodsSpecification = f.GoodsSpecification,
                                Num = f.Num,
                                Reason = f.Reason,
                                Status = f.Status,
                                CreationTime = f.CreationTime,
                                TUserName = ft.UserName,
                                TAddress = ft.Address,
                                TPhone = ft.Phone,
                                TIsSend = ft.IsSend
                            };

                var dataList = query
                   .WhereIf(!string.IsNullOrEmpty(input.AreaSe), b => b.Area == input.AreaSe)
                   .WhereIf(!string.IsNullOrEmpty(input.Name), d => d.TUserName.Contains(input.Name))
                   .WhereIf(!string.IsNullOrEmpty(input.Phone), d => d.TPhone.Contains(input.Phone))
                   .WhereIf(input.IsSend.HasValue, d => d.TIsSend == input.IsSend)
                   .OrderByDescending(q => q.Area)
                   .ThenBy(q => q.CreationTime)
                   .ToList();
                return dataList;
            }
            return new List<PostInfoDtoToExcel>();
        }
    }
}

