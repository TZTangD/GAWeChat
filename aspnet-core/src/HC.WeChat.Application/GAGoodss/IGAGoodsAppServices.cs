using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HC.WeChat.GAGoodss.Dtos;
using HC.WeChat.GAGoodses;

namespace HC.WeChat.GAGoodses
{
    /// <summary>
    /// GAGoods应用层服务的接口方法
    /// </summary>
    public interface IGAGoodsAppService : IApplicationService
    {
        /// <summary>
        /// 获取GAGoods的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<GAGoodsListDto>> GetPagedGAGoodss(GetGAGoodssInput input);

        /// <summary>
        /// 通过指定id获取GAGoodsListDto信息
        /// </summary>
        Task<GAGoodsListDto> GetGAGoodsByIdAsync(EntityDto<int> input);

        /// <summary>
        /// 导出GAGoods为excel表
        /// </summary>
        /// <returns></returns>
        //  Task<FileDto> GetGAGoodssToExcel();
        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<GetGAGoodsForEditOutput> GetGAGoodsForEdit(NullableIdDto<int> input);

        //todo:缺少Dto的生成GetGAGoodsForEditOutput
        /// <summary>
        /// 添加或者修改GAGoods的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateOrUpdateGAGoods(CreateOrUpdateGAGoodsInput input);

        /// <summary>
        /// 删除GAGoods信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteGAGoods(EntityDto<int> input);

        /// <summary>
        /// 批量删除GAGoods
        /// </summary>
        Task BatchDeleteGAGoodssAsync(List<int> input);
    }
}
