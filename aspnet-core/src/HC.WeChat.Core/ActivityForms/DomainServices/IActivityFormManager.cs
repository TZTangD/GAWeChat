using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.ActivityForms;

namespace HC.WeChat.ActivityForms.DomainServices
{
    public interface IActivityFormManager : IDomainService
    {

        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitActivityForm();

    }
}
