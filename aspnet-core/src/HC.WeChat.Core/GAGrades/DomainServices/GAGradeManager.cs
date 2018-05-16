using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.GAGrades;

namespace HC.WeChat.GAGrades.DomainServices
{
    /// <summary>
    /// GAGrade领域层的业务管理
    /// </summary>
    public class GAGradeManager : WeChatDomainServiceBase, IGAGradeManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<GAGrade, int> _gagradeRepository;
        /// <summary>
        /// GAGrade的构造方法
        /// </summary>
        public GAGradeManager(IRepository<GAGrade, int> gagradeRepository)
        {
            _gagradeRepository = gagradeRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitGAGrade()
        {
            throw new NotImplementedException();
        }

    }

}
