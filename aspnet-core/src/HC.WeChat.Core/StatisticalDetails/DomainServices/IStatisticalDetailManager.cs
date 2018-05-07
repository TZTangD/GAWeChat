using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.StatisticalDetails;

namespace HC.WeChat.StatisticalDetails.DomainServices
{
    public interface IStatisticalDetailManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitStatisticalDetail();

    }
}
