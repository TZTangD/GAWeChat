using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HC.WeChat.ExhibitionShops.Dtos;
using HC.WeChat.ExhibitionShops;
using System;

namespace HC.WeChat.ExhibitionShops
{
    /// <summary>
    /// ExhibitionShop应用层服务的接口方法
    /// </summary>
    public interface IExhibitionShopAppService : IApplicationService
    {
        /// <summary>
        /// 获取ExhibitionShop的分页列表信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<PagedResultDto<ExhibitionShopListDto>> GetPagedExhibitionShops(GetExhibitionShopsInput input);

            /// <summary>
            /// 通过指定id获取ExhibitionShopListDto信息
            /// </summary>
            Task<ExhibitionShopListDto> GetExhibitionShopByIdAsync(EntityDto<Guid> input);


        /// <summary>
        /// 导出ExhibitionShop为excel表
        /// </summary>
        /// <returns></returns>
		//Task<FileDto> GetExhibitionShopsToExcel();

        /// <summary>
        /// MPA版本才会用到的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<GetExhibitionShopForEditOutput> GetExhibitionShopForEdit(NullableIdDto<Guid> input);

        //todo:缺少Dto的生成GetExhibitionShopForEditOutput

        /// <summary>
        /// 添加或者修改ExhibitionShop的公共方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task CreateOrUpdateExhibitionShop(CreateOrUpdateExhibitionShopInput input);

        /// <summary>
        /// 删除ExhibitionShop信息的方法
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteExhibitionShop(EntityDto<Guid> input);

            /// <summary>
            /// 批量删除ExhibitionShop
            /// </summary>
        Task BatchDeleteExhibitionShopsAsync(List<Guid> input);
    }
}
