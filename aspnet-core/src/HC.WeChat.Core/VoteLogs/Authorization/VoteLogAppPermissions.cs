namespace HC.WeChat.VoteLogs.Authorization
{
	 /// <summary>
	 /// 定义系统的权限名称的字符串常量。
	 /// <see cref="VoteLogAppAuthorizationProvider"/>中对权限的定义.
	 /// </summary>
	public static   class VoteLogAppPermissions
	{


		/// <summary>
		/// VoteLog管理权限_自带查询授权
		/// </summary>
		public const string VoteLog = "Pages.VoteLog";

	 

		/// <summary>
		/// VoteLog创建权限
		/// </summary>
		public const string VoteLog_CreateVoteLog = "Pages.VoteLog.CreateVoteLog";

		/// <summary>
		/// VoteLog修改权限
		/// </summary>
		public const string VoteLog_EditVoteLog = "Pages.VoteLog.EditVoteLog";

		/// <summary>
		/// VoteLog删除权限
		/// </summary>
		public const string VoteLog_DeleteVoteLog = "Pages.VoteLog.DeleteVoteLog";

        /// <summary>
        /// VoteLog批量删除权限
        /// </summary>
		public const string VoteLog_BatchDeleteVoteLogs = "Pages.VoteLog.BatchDeleteVoteLogs";



    }
	
}

