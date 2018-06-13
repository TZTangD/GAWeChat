using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.LevelLogs;

namespace HC.WeChat.LevelLogs.DomainServices
{
    public interface ILevelLogManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitLevelLog();

    }
}
