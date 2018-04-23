using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;

using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using HC.WeChat.UserAnswers.Authorization;
using HC.WeChat.UserAnswers.Dtos;
using HC.WeChat.UserAnswers.DomainServices;
using HC.WeChat.UserAnswers;
using System;
using System.Linq;

namespace HC.WeChat.UserAnswers
{
    /// <summary>
    /// UserAnswer应用层服务的接口实现方法
    /// </summary>
    //[AbpAuthorize(UserAnswerAppPermissions.UserAnswer)]
    public class UserAnswerAppService : WeChatAppServiceBase, IUserAnswerAppService
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<UserAnswer, Guid> _useranswerRepository;
        private readonly IUserAnswerManager _useranswerManager;

        /// <summary>
        /// 构造函数
        /// </summary>
        public UserAnswerAppService(IRepository<UserAnswer, Guid> useranswerRepository
      , IUserAnswerManager useranswerManager
        )
        {
            _useranswerRepository = useranswerRepository;
            _useranswerManager = useranswerManager;
        }

        /// <summary>
        /// 获取UserAnswer的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<UserAnswerListDto>> GetPagedUserAnswers(GetUserAnswersInput input)
        {

            var query = _useranswerRepository.GetAll();
            //TODO:根据传入的参数添加过滤条件
            var useranswerCount = await query.CountAsync();

            var useranswers = await query
                .OrderBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();

            //var useranswerListDtos = ObjectMapper.Map<List <UserAnswerListDto>>(useranswers);
            var useranswerListDtos = useranswers.MapTo<List<UserAnswerListDto>>();

            return new PagedResultDto<UserAnswerListDto>(
                useranswerCount,
                useranswerListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取UserAnswerListDto信息
        /// </summary>
        public async Task<UserAnswerListDto> GetUserAnswerByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _useranswerRepository.GetAsync(input.Id);

            return entity.MapTo<UserAnswerListDto>();
        }

        /// <summary>
        /// 导出UserAnswer为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetUserAnswersToExcel(){
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
        public async Task<GetUserAnswerForEditOutput> GetUserAnswerForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetUserAnswerForEditOutput();
            UserAnswerEditDto useranswerEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _useranswerRepository.GetAsync(input.Id.Value);

                useranswerEditDto = entity.MapTo<UserAnswerEditDto>();

                //useranswerEditDto = ObjectMapper.Map<List <useranswerEditDto>>(entity);
            }
            else
            {
                useranswerEditDto = new UserAnswerEditDto();
            }

            output.UserAnswer = useranswerEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改UserAnswer的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateUserAnswer(CreateOrUpdateUserAnswerInput input)
        {

            if (input.UserAnswer.Id.HasValue)
            {
                await UpdateUserAnswerAsync(input.UserAnswer);
            }
            else
            {
                await CreateUserAnswerAsync(input.UserAnswer);
            }
        }

        /// <summary>
        /// 新增UserAnswer
        /// </summary>
        //[AbpAuthorize(UserAnswerAppPermissions.UserAnswer_CreateUserAnswer)]
        protected virtual async Task<UserAnswerEditDto> CreateUserAnswerAsync(UserAnswerEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<UserAnswer>(input);

            entity = await _useranswerRepository.InsertAsync(entity);
            return entity.MapTo<UserAnswerEditDto>();
        }

        /// <summary>
        /// 编辑UserAnswer
        /// </summary>
        //[AbpAuthorize(UserAnswerAppPermissions.UserAnswer_EditUserAnswer)]
        protected virtual async Task UpdateUserAnswerAsync(UserAnswerEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _useranswerRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            await _useranswerRepository.UpdateAsync(entity);
        }

        /// <summary>
        /// 删除UserAnswer信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        //[AbpAuthorize(UserAnswerAppPermissions.UserAnswer_DeleteUserAnswer)]
        public async Task DeleteUserAnswer(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _useranswerRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除UserAnswer的方法
        /// </summary>
        //[AbpAuthorize(UserAnswerAppPermissions.UserAnswer_BatchDeleteUserAnswers)]
        public async Task BatchDeleteUserAnswersAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _useranswerRepository.DeleteAsync(s => input.Contains(s.Id));
        }

        public async Task<List<UserAnswerListDto>> GetUserAnswerListByQuestionIdAsync(Guid id)
        {
            var answerList = await _useranswerRepository.GetAll().Where(u => u.UserQuestionId == id).ToListAsync();
            return answerList.MapTo<List<UserAnswerListDto>>();
        }
    }
}

