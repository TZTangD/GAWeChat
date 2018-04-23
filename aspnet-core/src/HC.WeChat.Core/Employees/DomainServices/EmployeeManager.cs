using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.Employees;

namespace HC.WeChat.Employees.DomainServices
{
    /// <summary>
    /// Employee领域层的业务管理
    /// </summary>
    public class EmployeeManager : WeChatDomainServiceBase, IEmployeeManager
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION
        private readonly IRepository<Employee, Guid> _employeeRepository;
        /// <summary>
        /// Employee的构造方法
        /// </summary>
        public EmployeeManager(IRepository<Employee, Guid> employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        //TODO:编写领域业务代码
        /// <summary>
        ///     初始化
        /// </summary>
        public void InitEmployee()
        {
            throw new NotImplementedException();
        }

    }

}
