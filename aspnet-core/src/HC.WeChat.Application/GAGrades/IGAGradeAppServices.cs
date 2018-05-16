using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HC.WeChat.GAGrades.Dtos;
using HC.WeChat.GAGrades;

namespace HC.WeChat.GAGrades
{
    /// <summary>
    /// GAGrade应用层服务的接口方法
    /// </summary>
    public interface IGAGradeAppService : IApplicationService
    {
        /// <summary>
        /// 获取GAGrade的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<GAGradeListDto>> GetPagedGAGrades(GetGAGradesInput input);

        /// <summary>
        /// 通过指定id获取GAGradeListDto信息
        /// </summary>
        Task<GAGradeListDto> GetGAGradeByIdAsync(EntityDto<int> input);

        /// <summary>
        /// 导出GAGrade为excel表
        /// </summary>
        /// <returns></returns>
        //  Task<FileDto> GetGAGradesToExcel();
        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<GetGAGradeForEditOutput> GetGAGradeForEdit(NullableIdDto<int> input);

        //todo:缺少Dto的生成GetGAGradeForEditOutput
        /// <summary>
        /// 添加或者修改GAGrade的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateOrUpdateGAGrade(CreateOrUpdateGAGradeInput input);

        /// <summary>
        /// 删除GAGrade信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteGAGrade(EntityDto<int> input);

        /// <summary>
        /// 批量删除GAGrade
        /// </summary>
        Task BatchDeleteGAGradesAsync(List<int> input);
    }
}
