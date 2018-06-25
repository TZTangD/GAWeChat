using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.WinningRecords;

namespace HC.WeChat.WinningRecords.DomainServices
{
    public interface IWinningRecordManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitWinningRecord();

    }
}
