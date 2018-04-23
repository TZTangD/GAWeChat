using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;

using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using HC.WeChat.UserQuestions.Authorization;
using HC.WeChat.UserQuestions.Dtos;
using HC.WeChat.UserQuestions.DomainServices;
using HC.WeChat.UserQuestions;
using System;
using HC.WeChat.Dto;
using HC.WeChat.UserAnswers;
using System.Linq;

namespace HC.WeChat.UserQuestions
{
    /// <summary>
    /// UserQuestion应用层服务的接口实现方法
    /// </summary>
    //[AbpAuthorize(UserQuestionAppPermissions.UserQuestion)]
    public class UserQuestionAppService : WeChatAppServiceBase, IUserQuestionAppService
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<UserQuestion, Guid> _userquestionRepository;
        private readonly IRepository<UserAnswer, Guid> _useranswerRepository;
        private readonly IUserQuestionManager _userquestionManager;

        /// <summary>
        /// 构造函数
        /// </summary>
        public UserQuestionAppService(IRepository<UserQuestion, Guid> userquestionRepository
        , IUserQuestionManager userquestionManager
        , IRepository<UserAnswer, Guid> useranswerRepository
        )
        {
            _userquestionRepository = userquestionRepository;
            _userquestionManager = userquestionManager;
            _useranswerRepository = useranswerRepository;
        }

        /// <summary>
        /// 获取UserQuestion的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<UserQuestionListDto>> GetPagedUserQuestions(GetUserQuestionsInput input)
        {

            var query = _userquestionRepository.GetAll().WhereIf(!string.IsNullOrEmpty(input.Filter), q => q.UserName.Contains(input.Filter) || q.Phone.Contains(input.Filter));
            //TODO:根据传入的参数添加过滤条件
            var userquestionCount = await query.CountAsync();

            var userquestions = await query
                .OrderByDescending(u => u.CreationTime)
                .PageBy(input)
                .ToListAsync();

            //var userquestionListDtos = ObjectMapper.Map<List <UserQuestionListDto>>(userquestions);
            var userquestionListDtos = userquestions.MapTo<List<UserQuestionListDto>>();

            return new PagedResultDto<UserQuestionListDto>(
                userquestionCount,
                userquestionListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取UserQuestionListDto信息
        /// </summary>
        public async Task<UserQuestionListDto> GetUserQuestionByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _userquestionRepository.GetAsync(input.Id);

            return entity.MapTo<UserQuestionListDto>();
        }

        /// <summary>
        /// 导出UserQuestion为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetUserQuestionsToExcel(){
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
        public async Task<GetUserQuestionForEditOutput> GetUserQuestionForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetUserQuestionForEditOutput();
            UserQuestionEditDto userquestionEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _userquestionRepository.GetAsync(input.Id.Value);

                userquestionEditDto = entity.MapTo<UserQuestionEditDto>();

                //userquestionEditDto = ObjectMapper.Map<List <userquestionEditDto>>(entity);
            }
            else
            {
                userquestionEditDto = new UserQuestionEditDto();
            }

            output.UserQuestion = userquestionEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改UserQuestion的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateUserQuestion(CreateOrUpdateUserQuestionInput input)
        {

            if (input.UserQuestion.Id.HasValue)
            {
                await UpdateUserQuestionAsync(input.UserQuestion);
            }
            else
            {
                await CreateUserQuestionAsync(input.UserQuestion);
            }
        }

        /// <summary>
        /// 新增UserQuestion
        /// </summary>
        //[AbpAuthorize(UserQuestionAppPermissions.UserQuestion_CreateUserQuestion)]
        protected virtual async Task<UserQuestionEditDto> CreateUserQuestionAsync(UserQuestionEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<UserQuestion>(input);

            entity = await _userquestionRepository.InsertAsync(entity);
            return entity.MapTo<UserQuestionEditDto>();
        }

        /// <summary>
        /// 编辑UserQuestion
        /// </summary>
        //[AbpAuthorize(UserQuestionAppPermissions.UserQuestion_EditUserQuestion)]
        protected virtual async Task UpdateUserQuestionAsync(UserQuestionEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _userquestionRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            await _userquestionRepository.UpdateAsync(entity);
        }

        /// <summary>
        /// 删除UserQuestion信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        //[AbpAuthorize(UserQuestionAppPermissions.UserQuestion_DeleteUserQuestion)]
        public async Task DeleteUserQuestion(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _userquestionRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除UserQuestion的方法
        /// </summary>
        //[AbpAuthorize(UserQuestionAppPermissions.UserQuestion_BatchDeleteUserQuestions)]
        public async Task BatchDeleteUserQuestionsAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _userquestionRepository.DeleteAsync(s => input.Contains(s.Id));
        }

        /// <summary>
        /// 问卷调查
        /// </summary>
        public async Task<APIResultDto> SubmitUserQuestionsAsync(UserQuestionDto input)
        {
            var question = input.MapTo<UserQuestion>();
            question.CreationTime = DateTime.Now;
            var answerList = input.UserAnswerList.MapTo<List<UserAnswer>>();
            var questionId = await _userquestionRepository.InsertAndGetIdAsync(question);
            await CurrentUnitOfWork.SaveChangesAsync();
            foreach (var item in answerList)
            {
                item.UserQuestionId = questionId;
                //item.Content = item.Content.Substring(0, item.Content.Length - 1);
                await _useranswerRepository.InsertAsync(item);
            }
            return new APIResultDto() { Code = 0, Msg = "提交成功，感谢您的参与！" };
        }
    }
}

