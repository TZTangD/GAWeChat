using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.PurchaseRecords;

namespace HC.WeChat.PurchaseRecords.DomainServices
{
    /// <summary>
    /// PurchaseRecord领域层的业务管理
    /// </summary>
    public class PurchaseRecordManager : WeChatDomainServiceBase, IPurchaseRecordManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<PurchaseRecord, Guid> _purchaserecordRepository;
        /// <summary>
        /// PurchaseRecord的构造方法
        /// </summary>
        public PurchaseRecordManager(IRepository<PurchaseRecord, Guid> purchaserecordRepository)
        {
            _purchaserecordRepository = purchaserecordRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitPurchaseRecord()
        {
            throw new NotImplementedException();
        }

    }

}
