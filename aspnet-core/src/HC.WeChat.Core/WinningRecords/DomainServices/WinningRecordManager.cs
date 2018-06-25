using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.WinningRecords;

namespace HC.WeChat.WinningRecords.DomainServices
{
    /// <summary>
    /// WinningRecord领域层的业务管理
    /// </summary>
    public class WinningRecordManager : WeChatDomainServiceBase, IWinningRecordManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<WinningRecord, Guid> _winningrecordRepository;
        /// <summary>
        /// WinningRecord的构造方法
        /// </summary>
        public WinningRecordManager(IRepository<WinningRecord, Guid> winningrecordRepository)
        {
            _winningrecordRepository = winningrecordRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitWinningRecord()
        {
            throw new NotImplementedException();
        }

    }

}
