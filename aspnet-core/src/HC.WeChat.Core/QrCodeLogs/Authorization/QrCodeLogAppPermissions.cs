namespace HC.WeChat.QrCodeLogs.Authorization
{
	 /// <summary>
	 /// 定义系统的权限名称的字符串常量。
	 /// <see cref="QrCodeLogAppAuthorizationProvider"/>中对权限的定义.
	 /// </summary>
	public static   class QrCodeLogAppPermissions
	{


		/// <summary>
		/// QrCodeLog管理权限_自带查询授权
		/// </summary>
		public const string QrCodeLog = "Pages.QrCodeLog";

	 

		/// <summary>
		/// QrCodeLog创建权限
		/// </summary>
		public const string QrCodeLog_CreateQrCodeLog = "Pages.QrCodeLog.CreateQrCodeLog";

		/// <summary>
		/// QrCodeLog修改权限
		/// </summary>
		public const string QrCodeLog_EditQrCodeLog = "Pages.QrCodeLog.EditQrCodeLog";

		/// <summary>
		/// QrCodeLog删除权限
		/// </summary>
		public const string QrCodeLog_DeleteQrCodeLog = "Pages.QrCodeLog.DeleteQrCodeLog";

        /// <summary>
        /// QrCodeLog批量删除权限
        /// </summary>
		public const string QrCodeLog_BatchDeleteQrCodeLogs = "Pages.QrCodeLog.BatchDeleteQrCodeLogs";



    }
	
}

