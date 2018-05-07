using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.Employees;

namespace HC.WeChat.Employees.DomainServices
{
    public interface IEmployeeManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitEmployee();

    }
}
