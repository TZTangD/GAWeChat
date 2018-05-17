using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;

using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using HC.WeChat.GAGrades.Authorization;
using HC.WeChat.GAGrades.Dtos;
using HC.WeChat.GAGrades.DomainServices;
using HC.WeChat.GAGrades;

namespace HC.WeChat.GAGrades
{
    /// <summary>
    /// GAGrade应用层服务的接口实现方法
    /// </summary>
    [AbpAuthorize(GAGradeAppPermissions.GAGrade)]
    public class GAGradeAppService : WeChatAppServiceBase, IGAGradeAppService
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<GAGrade, int> _gagradeRepository;
        private readonly IGAGradeManager _gagradeManager;

        /// <summary>
        /// 构造函数
        /// </summary>
        public GAGradeAppService(IRepository<GAGrade, int> gagradeRepository
      , IGAGradeManager gagradeManager
        )
        {
            _gagradeRepository = gagradeRepository;
            _gagradeManager = gagradeManager;
        }

        /// <summary>
        /// 获取GAGrade的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<PagedResultDto<GAGradeListDto>> GetPagedGAGrades(GetGAGradesInput input)
        {

            var query = _gagradeRepository.GetAll();
            //TODO:根据传入的参数添加过滤条件
            var gagradeCount = await query.CountAsync();

            var gagrades = await query
                .OrderBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();

            //var gagradeListDtos = ObjectMapper.Map<List <GAGradeListDto>>(gagrades);
            var gagradeListDtos = gagrades.MapTo<List<GAGradeListDto>>();

            return new PagedResultDto<GAGradeListDto>(
                gagradeCount,
                gagradeListDtos
                );

        }

        /// <summary>
        /// 通过指定id获取GAGradeListDto信息
        /// </summary>
        public async Task<GAGradeListDto> GetGAGradeByIdAsync(EntityDto<int> input)
        {
            var entity = await _gagradeRepository.GetAsync(input.Id);

            return entity.MapTo<GAGradeListDto>();
        }

        /// <summary>
        /// 导出GAGrade为excel表
        /// </summary>
        /// <returns></returns>
        //public async Task<FileDto> GetGAGradesToExcel(){
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
        public async Task<GetGAGradeForEditOutput> GetGAGradeForEdit(NullableIdDto<int> input)
        {
            var output = new GetGAGradeForEditOutput();
            GAGradeEditDto gagradeEditDto;

            if (input.Id.HasValue)
            {
                var entity = await _gagradeRepository.GetAsync(input.Id.Value);

                gagradeEditDto = entity.MapTo<GAGradeEditDto>();

                //gagradeEditDto = ObjectMapper.Map<List <gagradeEditDto>>(entity);
            }
            else
            {
                gagradeEditDto = new GAGradeEditDto();
            }

            output.GAGrade = gagradeEditDto;
            return output;

        }

        /// <summary>
        /// 添加或者修改GAGrade的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task CreateOrUpdateGAGrade(CreateOrUpdateGAGradeInput input)
        {

            if (input.GAGrade.Id.HasValue)
            {
                await UpdateGAGradeAsync(input.GAGrade);
            }
            else
            {
                await CreateGAGradeAsync(input.GAGrade);
            }
        }

        /// <summary>
        /// 新增GAGrade
        /// </summary>
        [AbpAuthorize(GAGradeAppPermissions.GAGrade_CreateGAGrade)]
        protected virtual async Task<GAGradeEditDto> CreateGAGradeAsync(GAGradeEditDto input)
        {
            //TODO:新增前的逻辑判断，是否允许新增
            var entity = ObjectMapper.Map<GAGrade>(input);

            entity = await _gagradeRepository.InsertAsync(entity);
            return entity.MapTo<GAGradeEditDto>();
        }

        /// <summary>
        /// 编辑GAGrade
        /// </summary>
        [AbpAuthorize(GAGradeAppPermissions.GAGrade_EditGAGrade)]
        protected virtual async Task UpdateGAGradeAsync(GAGradeEditDto input)
        {
            //TODO:更新前的逻辑判断，是否允许更新
            var entity = await _gagradeRepository.GetAsync(input.Id.Value);
            input.MapTo(entity);

            // ObjectMapper.Map(input, entity);
            await _gagradeRepository.UpdateAsync(entity);
        }

        /// <summary>
        /// 删除GAGrade信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [AbpAuthorize(GAGradeAppPermissions.GAGrade_DeleteGAGrade)]
        public async Task DeleteGAGrade(EntityDto<int> input)
        {

            //TODO:删除前的逻辑判断，是否允许删除
            await _gagradeRepository.DeleteAsync(input.Id);
        }

        /// <summary>
        /// 批量删除GAGrade的方法
        /// </summary>
        [AbpAuthorize(GAGradeAppPermissions.GAGrade_BatchDeleteGAGrades)]
        public async Task BatchDeleteGAGradesAsync(List<int> input)
        {
            //TODO:批量删除前的逻辑判断，是否允许删除
            await _gagradeRepository.DeleteAsync(s => input.Contains(s.Id));
        }

    }
}

