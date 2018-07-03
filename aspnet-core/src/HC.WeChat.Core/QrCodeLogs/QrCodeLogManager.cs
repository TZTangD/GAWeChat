using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.QrCodeLogs;

namespace HC.WeChat.QrCodeLogs.DomainServices
{
    /// <summary>
    /// QrCodeLog领域层的业务管理
    /// </summary>
    public class QrCodeLogManager :WeChatDomainServiceBase, IQrCodeLogManager
    {
        private readonly IRepository<QrCodeLog, Guid> _qrcodelogRepository;
        /// <summary>
        /// QrCodeLog的构造方法
        /// </summary>
        public QrCodeLogManager(IRepository<QrCodeLog, Guid> qrcodelogRepository)
        {
            _qrcodelogRepository = qrcodelogRepository;
        }

		//TODO:编写领域业务代码
		
		
		/// <summary>
		///     初始化
		/// </summary>
		public void InitQrCodeLog()
		{
			throw new NotImplementedException();
		}
    }



}
