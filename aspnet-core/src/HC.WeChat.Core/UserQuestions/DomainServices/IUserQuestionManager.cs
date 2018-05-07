using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.UserQuestions;

namespace HC.WeChat.UserQuestions.DomainServices
{
    public interface IUserQuestionManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitUserQuestion();

    }
}
