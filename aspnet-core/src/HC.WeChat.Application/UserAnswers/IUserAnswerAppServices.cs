using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HC.WeChat.UserAnswers.Dtos;
using HC.WeChat.UserAnswers;
using System;

namespace HC.WeChat.UserAnswers
{
    /// <summary>
    /// UserAnswer应用层服务的接口方法
    /// </summary>
    public interface IUserAnswerAppService : IApplicationService
    {
        /// <summary>
        /// 获取UserAnswer的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<UserAnswerListDto>> GetPagedUserAnswers(GetUserAnswersInput input);

        /// <summary>
        /// 通过指定id获取UserAnswerListDto信息
        /// </summary>
        Task<UserAnswerListDto> GetUserAnswerByIdAsync(EntityDto<Guid> input);

        /// <summary>
        /// 导出UserAnswer为excel表
        /// </summary>
        /// <returns></returns>
        //  Task<FileDto> GetUserAnswersToExcel();
        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<GetUserAnswerForEditOutput> GetUserAnswerForEdit(NullableIdDto<Guid> input);

        //todo:缺少Dto的生成GetUserAnswerForEditOutput
        /// <summary>
        /// 添加或者修改UserAnswer的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateOrUpdateUserAnswer(CreateOrUpdateUserAnswerInput input);

        /// <summary>
        /// 删除UserAnswer信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteUserAnswer(EntityDto<Guid> input);

        /// <summary>
        /// 批量删除UserAnswer
        /// </summary>
        Task BatchDeleteUserAnswersAsync(List<Guid> input);

        /// <summary>
        /// 根据问题Id查询用户回答
        /// </summary>
        Task<List<UserAnswerListDto>> GetUserAnswerListByQuestionIdAsync(Guid id);
    }
}
