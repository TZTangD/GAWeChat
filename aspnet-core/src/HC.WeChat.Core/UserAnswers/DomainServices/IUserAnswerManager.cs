using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.UserAnswers;

namespace HC.WeChat.UserAnswers.DomainServices
{
    public interface IUserAnswerManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitUserAnswer();

    }
}
