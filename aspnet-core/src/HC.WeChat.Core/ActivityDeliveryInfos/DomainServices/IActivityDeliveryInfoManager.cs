using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.ActivityDeliveryInfos;

namespace HC.WeChat.ActivityDeliveryInfos.DomainServices
{
    public interface IActivityDeliveryInfoManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitActivityDeliveryInfo();

    }
}
