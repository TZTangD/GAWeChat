using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using HC.WeChat.VoteLogs;

namespace HC.WeChat.VoteLogs.DomainServices
{
    /// <summary>
    /// VoteLog领域层的业务管理
    /// </summary>
    public class VoteLogManager :WeChatDomainServiceBase, IVoteLogManager
    {
        private readonly IRepository<VoteLog, Guid> _votelogRepository;
        /// <summary>
        /// VoteLog的构造方法
        /// </summary>
        public VoteLogManager(IRepository<VoteLog, Guid> votelogRepository)
        {
            _votelogRepository = votelogRepository;
        }

		//TODO:编写领域业务代码
		
		
		/// <summary>
		///     初始化
		/// </summary>
		public void InitVoteLog()
		{
			throw new NotImplementedException();
		}
    }



}
