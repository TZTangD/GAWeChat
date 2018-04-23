using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.ActivityGoodses;

namespace HC.WeChat.ActivityGoodses.DomainServices
{
    public interface IActivityGoodsManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitActivityGoods();

    }
}
