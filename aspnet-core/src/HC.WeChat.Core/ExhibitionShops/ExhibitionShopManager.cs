using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;

namespace HC.WeChat.ExhibitionShops.DomainServices
{
    /// <summary>
    /// ExhibitionShop领域层的业务管理
    /// </summary>
    public class ExhibitionShopManager :WeChatDomainServiceBase, IExhibitionShopManager
    {
        private readonly IRepository<ExhibitionShop, Guid> _exhibitionshopRepository;
        /// <summary>
        /// ExhibitionShop的构造方法
        /// </summary>
        public ExhibitionShopManager(IRepository<ExhibitionShop, Guid> exhibitionshopRepository)
        {
            _exhibitionshopRepository = exhibitionshopRepository;
        }

		//TODO:编写领域业务代码
		
		
		/// <summary>
		///     初始化
		/// </summary>
		public void InitExhibitionShop()
		{
			throw new NotImplementedException();
		}
    }



}
