using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.EPCoLines;

namespace HC.WeChat.EPCoLines.DomainServices
{
    public interface IEPCoLineManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitEPCoLine();

    }
}
