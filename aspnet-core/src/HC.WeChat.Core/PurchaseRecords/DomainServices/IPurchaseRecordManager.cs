using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.PurchaseRecords;

namespace HC.WeChat.PurchaseRecords.DomainServices
{
    public interface IPurchaseRecordManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitPurchaseRecord();

    }
}
