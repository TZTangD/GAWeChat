using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.ActivityBanquets;

namespace HC.WeChat.ActivityBanquets.DomainServices
{
    public interface IActivityBanquetManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitActivityBanquet();

    }
}
