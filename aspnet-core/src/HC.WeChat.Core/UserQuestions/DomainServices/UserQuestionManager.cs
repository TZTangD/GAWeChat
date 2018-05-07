using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.UserQuestions;

namespace HC.WeChat.UserQuestions.DomainServices
{
    /// <summary>
    /// UserQuestion领域层的业务管理
    /// </summary>
    public class UserQuestionManager : WeChatDomainServiceBase, IUserQuestionManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<UserQuestion, Guid> _userquestionRepository;
        /// <summary>
        /// UserQuestion的构造方法
        /// </summary>
        public UserQuestionManager(IRepository<UserQuestion, Guid> userquestionRepository)
        {
            _userquestionRepository = userquestionRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitUserQuestion()
        {
            throw new NotImplementedException();
        }

    }

}
