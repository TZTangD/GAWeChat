using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.GAGoodses;

namespace HC.WeChat.GAGoodses.DomainServices
{
    public interface IGAGoodsManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitGAGoods();

    }
}
