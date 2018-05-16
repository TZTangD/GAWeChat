using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.GAGrades;

namespace HC.WeChat.GAGrades.DomainServices
{
    public interface IGAGradeManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitGAGrade();

    }
}
