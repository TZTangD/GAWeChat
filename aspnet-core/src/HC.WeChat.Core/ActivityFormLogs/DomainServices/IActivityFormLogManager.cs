using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.ActivityFormLogs;

namespace HC.WeChat.ActivityFormLogs.DomainServices
{
    public interface IActivityFormLogManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitActivityFormLog();

    }
}
