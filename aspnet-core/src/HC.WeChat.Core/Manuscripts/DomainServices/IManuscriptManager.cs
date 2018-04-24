using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.Manuscripts;

namespace HC.WeChat.Manuscripts.DomainServices
{
    public interface IManuscriptManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitManuscript();

    }
}
