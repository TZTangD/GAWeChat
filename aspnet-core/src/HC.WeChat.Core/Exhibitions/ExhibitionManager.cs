using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.Exhibitions;

namespace HC.WeChat.Exhibitions.DomainServices
{
    /// <summary>
    /// Exhibition领域层的业务管理
    /// </summary>
    public class ExhibitionManager :WeChatDomainServiceBase, IExhibitionManager
    {
        private readonly IRepository<Exhibition, Guid> _exhibitionRepository;
        /// <summary>
        /// Exhibition的构造方法
        /// </summary>
        public ExhibitionManager(IRepository<Exhibition, Guid> exhibitionRepository)
        {
            _exhibitionRepository = exhibitionRepository;
        }

		//TODO:编写领域业务代码
		
		
		/// <summary>
		///     初始化
		/// </summary>
		public void InitExhibition()
		{
			throw new NotImplementedException();
		}
    }



}
