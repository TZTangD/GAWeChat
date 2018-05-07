using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.ShopEvaluations;

namespace HC.WeChat.ShopEvaluations.DomainServices
{
    public interface IShopEvaluationManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitShopEvaluation();

    }
}
