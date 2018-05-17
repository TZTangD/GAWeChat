using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.GACustPoints;

namespace HC.WeChat.GACustPoints.DomainServices
{
    public interface IGACustPointManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitGACustPoint();

    }
}
