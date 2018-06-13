using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.LevelLogs;

namespace HC.WeChat.LevelLogs.DomainServices
{
    /// <summary>
    /// LevelLog领域层的业务管理
    /// </summary>
    public class LevelLogManager : WeChatDomainServiceBase, ILevelLogManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<LevelLog, Guid> _levellogRepository;
        /// <summary>
        /// LevelLog的构造方法
        /// </summary>
        public LevelLogManager(IRepository<LevelLog, Guid> levellogRepository)
        {
            _levellogRepository = levellogRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitLevelLog()
        {
            throw new NotImplementedException();
        }

    }

}
