using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using System.Linq;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;

using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using HC.WeChat.VoteLogs.Authorization;
using HC.WeChat.VoteLogs.DomainServices;
using HC.WeChat.VoteLogs.Dtos;
using HC.WeChat.VoteLogs;
using System;

namespace HC.WeChat.VoteLogs
{
    /// <summary>
    /// VoteLog应用层服务的接口实现方法
    /// </summary>
    [AbpAuthorize(VoteLogAppPermissions.VoteLog)]
    public class VoteLogAppService : WeChatAppServiceBase, IVoteLogAppService
    {
        private readonly IRepository<VoteLog, Guid> _votelogRepository;
        private readonly IVoteLogManager _votelogManager;

        /// <summary>
        /// 构造函数
        /// </summary>
        public VoteLogAppService(
            IRepository<VoteLog, Guid> votelogRepository
      , IVoteLogManager votelogManager
        )
        {
            _votelogRepository = votelogRepository;
            _votelogManager = votelogManager;
        }


        /// <summary>
        /// 获取VoteLog的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<VoteLogListDto>> GetPagedVoteLogs(GetVoteLogsInput input)
        {

            var query = _votelogRepository.GetAll();
            //TODO:根据传入的参数添加过滤条件

            var votelogCount = await query.CountAsync();

            var votelogs = await query
                .OrderBy(input.Sorting).AsNoTracking()
                .PageBy(input)
                .ToListAsync();

            //var votelogListDtos = ObjectMapper.Map<List <VoteLogListDto>>(votelogs);
            var votelogListDtos = votelogs.MapTo<List<VoteLogListDto>>();

            return new PagedResultDto<VoteLogListDto>(
                votelogCount,
                votelogListDtos
                );






        }

        /// <summary>
        /// 通过指定id获取VoteLogListDto信息
        /// </summary>
        public async Task<VoteLogListDto> GetVoteLogByIdAsync(EntityDto<Guid> input)
        {
            var entity = await _votelogRepository.GetAsync(input.Id);

            return entity.MapTo<VoteLogListDto>();
        }






        /// <summary>
        /// 导出VoteLog为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetVoteLogsToExcel(){

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
        public async Task<GetVoteLogForEditOutput> GetVoteLogForEdit(NullableIdDto<Guid> input)
        {
            var output = new GetVoteLogForEditOutput();
            VoteLogEditDto votelogEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _votelogRepository.GetAsync(input.Id.Value);

                votelogEditDto = entity.MapTo<VoteLogEditDto>();

                //votelogEditDto = ObjectMapper.Map<List <votelogEditDto>>(entity);


            }
            else
            {
                votelogEditDto = new VoteLogEditDto();
            }

            output.VoteLog = votelogEditDto;
            return output;

        }


        /// <summary>
        /// 添加或者修改VoteLog的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateVoteLog(CreateOrUpdateVoteLogInput input)
        {

            if (input.VoteLog.Id.HasValue)
            {
                await UpdateVoteLogAsync(input.VoteLog);
            }
            else
            {
                await CreateVoteLogAsync(input.VoteLog);
            }
        }

        /// <summary>
        /// 新增VoteLog
        /// </summary>
        [AbpAuthorize(VoteLogAppPermissions.VoteLog_CreateVoteLog)]
        protected virtual async Task<VoteLogEditDto> CreateVoteLogAsync(VoteLogEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增

            var entity = ObjectMapper.Map<VoteLog>(input);

            entity = await _votelogRepository.InsertAsync(entity);
            return entity.MapTo<VoteLogEditDto>();
        }

        /// <summary>
        /// 编辑VoteLog
        /// </summary>
        [AbpAuthorize(VoteLogAppPermissions.VoteLog_EditVoteLog)]
        protected virtual async Task UpdateVoteLogAsync(VoteLogEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新

            var entity = await _votelogRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            await _votelogRepository.UpdateAsync(entity);
        }




        /// <summary>
        /// 删除VoteLog信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [AbpAuthorize(VoteLogAppPermissions.VoteLog_DeleteVoteLog)]
        public async Task DeleteVoteLog(EntityDto<Guid> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _votelogRepository.DeleteAsync(input.Id);
        }



        /// <summary>
        /// 批量删除VoteLog的方法
        /// </summary>
        [AbpAuthorize(VoteLogAppPermissions.VoteLog_BatchDeleteVoteLogs)]
        public async Task BatchDeleteVoteLogsAsync(List<Guid> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _votelogRepository.DeleteAsync(s => input.Contains(s.Id));
        }

    }
}


