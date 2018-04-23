using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HC.WeChat.UserQuestions.Dtos;
using HC.WeChat.UserQuestions;
using System;
using HC.WeChat.Dto;

namespace HC.WeChat.UserQuestions
{
    /// <summary>
    /// UserQuestion应用层服务的接口方法
    /// </summary>
    public interface IUserQuestionAppService : IApplicationService
    {
        /// <summary>
        /// 获取UserQuestion的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<UserQuestionListDto>> GetPagedUserQuestions(GetUserQuestionsInput input);

        /// <summary>
        /// 通过指定id获取UserQuestionListDto信息
        /// </summary>
        Task<UserQuestionListDto> GetUserQuestionByIdAsync(EntityDto<Guid> input);

        /// <summary>
        /// 导出UserQuestion为excel表
        /// </summary>
        /// <returns></returns>
        //  Task<FileDto> GetUserQuestionsToExcel();
        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<GetUserQuestionForEditOutput> GetUserQuestionForEdit(NullableIdDto<Guid> input);

        //todo:缺少Dto的生成GetUserQuestionForEditOutput
        /// <summary>
        /// 添加或者修改UserQuestion的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateOrUpdateUserQuestion(CreateOrUpdateUserQuestionInput input);

        /// <summary>
        /// 删除UserQuestion信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteUserQuestion(EntityDto<Guid> input);

        /// <summary>
        /// 批量删除UserQuestion
        /// </summary>
        Task BatchDeleteUserQuestionsAsync(List<Guid> input);

        /// <summary>
        /// 问卷调查
        /// </summary>
        Task<APIResultDto> SubmitUserQuestionsAsync(UserQuestionDto input);
    }
}
