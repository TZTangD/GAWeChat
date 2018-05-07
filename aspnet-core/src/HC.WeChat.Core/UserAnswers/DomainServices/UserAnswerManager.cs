using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.UserAnswers;

namespace HC.WeChat.UserAnswers.DomainServices
{
    /// <summary>
    /// UserAnswer领域层的业务管理
    /// </summary>
    public class UserAnswerManager : WeChatDomainServiceBase, IUserAnswerManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<UserAnswer, Guid> _useranswerRepository;
        /// <summary>
        /// UserAnswer的构造方法
        /// </summary>
        public UserAnswerManager(IRepository<UserAnswer, Guid> useranswerRepository)
        {
            _useranswerRepository = useranswerRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitUserAnswer()
        {
            throw new NotImplementedException();
        }

    }

}
