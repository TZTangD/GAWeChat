using System;
using System.Threading.Tasks;
using Abp;
using Abp.Domain.Services;
using HC.WeChat.VoteLogs;


namespace HC.WeChat.VoteLogs.DomainServices
{
    public interface IVoteLogManager : IDomainService
    {
        
        /// <summary>
        /// 初始化方法
        /// </summary>
        void InitVoteLog();



    }
}
