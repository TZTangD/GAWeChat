using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HC.WeChat.Prizes.Dtos;
using HC.WeChat.Prizes;
using System;

namespace HC.WeChat.Prizes
{
    /// <summary>
    /// Prize应用层服务的接口方法
    /// </summary>
    public interface IPrizeAppService : IApplicationService
    {
        /// <summary>
        /// 获取Prize的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<PrizeListDto>> GetPagedPrizes(GetPrizesInput input);

        /// <summary>
        /// 通过指定id获取PrizeListDto信息
        /// </summary>
        Task<PrizeListDto> GetPrizeByIdAsync(EntityDto<Guid> input);

        /// <summary>
        /// 导出Prize为excel表
        /// </summary>
        /// <returns></returns>
        //  Task<FileDto> GetPrizesToExcel();
        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<GetPrizeForEditOutput> GetPrizeForEdit(NullableIdDto<Guid> input);

        //todo:缺少Dto的生成GetPrizeForEditOutput
        /// <summary>
        /// 添加或者修改Prize的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateOrUpdatePrize(CreateOrUpdatePrizeInput input);

        /// <summary>
        /// 删除Prize信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeletePrize(EntityDto<Guid> input);

        /// <summary>
        /// 批量删除Prize
        /// </summary>
        Task BatchDeletePrizesAsync(List<Guid> input);
    }
}
