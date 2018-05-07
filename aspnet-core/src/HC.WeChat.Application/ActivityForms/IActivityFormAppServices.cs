using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HC.WeChat.ActivityForms.Dtos;
using HC.WeChat.ActivityForms;
using System;
using HC.WeChat.Dto;
using HC.WeChat.WeChatUsers.Dtos;

namespace HC.WeChat.ActivityForms
{
    /// <summary>
    /// ActivityForm应用层服务的接口方法
    /// </summary>
    public interface IActivityFormAppService : IApplicationService
    {
        /// <summary>
        /// 获取ActivityForm的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<ActivityFormListDto>> GetPagedActivityForms(GetActivityFormsInput input);

        /// <summary>
        /// 通过指定id获取ActivityFormListDto信息
        /// </summary>
        Task<ActivityFormListDto> GetActivityFormByIdAsync(EntityDto<Guid> input);

        /// <summary>
        /// 导出ActivityForm为excel表
        /// </summary>
        /// <returns></returns>
        //  Task<FileDto> GetActivityFormsToExcel();
        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<GetActivityFormForEditOutput> GetActivityFormForEdit(NullableIdDto<Guid> input);

        //todo:缺少Dto的生成GetActivityFormForEditOutput
        /// <summary>
        /// 添加或者修改ActivityForm的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateOrUpdateActivityForm(CreateOrUpdateActivityFormInput input);

        /// <summary>
        /// 删除ActivityForm信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteActivityForm(EntityDto<Guid> input);

        /// <summary>
        /// 批量删除ActivityForm
        /// </summary>
        Task BatchDeleteActivityFormsAsync(List<Guid> input);

        Task<APIResultDto> SubmitActivityFormAsync(ActivityFormInputDto input);

        Task<APIResultDto> ChangeActivityFormStatusAsync(ActivityFormStatusDto input);

        /// <summary>
        /// 获取ActivityView的分页列表信息
        /// </summary>
        Task<PagedResultDto<ActivityViewDto>> GetPagedActivityView(GetActivityViewInput input);

        /// <summary>
        /// 获取首页的数据
        /// </summary>
        /// <returns></returns>
        Task<ActivityFormCountInfoDto> GetHomeInfo();

        /// <summary>
        /// 获取活动申请单列表以及单数
        /// </summary>
        /// <param name="check"></param>
        /// <returns></returns>
        Task<ActivityFormForWechat> GetActivityFormList(bool check, WeChatUserListDto user);

        /// <summary>
        /// 获取单条活动申请单数据
        /// </summary>
        /// <param name="id">活动申请单id</param>
        /// <returns></returns>
        ActivityFormListDto GetSingleFormDto(Guid id);

        /// <summary>
        /// 针对微信端的取消，初审通过
        /// </summary>
        /// <param name="input"></param>
        /// <param name="user"></param>
        /// <param name="tenantId"></param>
        /// <returns></returns>
        Task<APIResultDto> ChangeActivityFormStatusWeChatAsync(ActivityFromStatusDtoss input);

        /// <summary>
        /// 获取未完成 和 已完成单数
        /// </summary>
        Task<ActivityFormCountDto> GetActivityFormCountByUserAsync(WeChatUserListDto user);

        /// <summary>
        /// 获取邮寄信息
        /// </summary>
        /// <param name="input">查询条件</param>
        /// <returns></returns>
        Task<PagedResultDto<PostInfoDto>> GetPostInfo(GetActivityFormsSentInput input);
        
        /// <summary>
        /// 导出Excel
        /// </summary>
        Task<APIResultDto> ExportPostInfoExcel(GetActivityFormsSentInput input);
    }
}
