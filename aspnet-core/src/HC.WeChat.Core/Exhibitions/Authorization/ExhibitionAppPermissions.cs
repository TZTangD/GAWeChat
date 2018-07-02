namespace HC.WeChat.Exhibitions.Authorization
{
	 /// <summary>
	 /// 定义系统的权限名称的字符串常量。
	 /// <see cref="ExhibitionAppAuthorizationProvider"/>中对权限的定义.
	 /// </summary>
	public static   class ExhibitionAppPermissions
	{


		/// <summary>
		/// Exhibition管理权限_自带查询授权
		/// </summary>
		public const string Exhibition = "Pages.Exhibition";

	 

		/// <summary>
		/// Exhibition创建权限
		/// </summary>
		public const string Exhibition_CreateExhibition = "Pages.Exhibition.CreateExhibition";

		/// <summary>
		/// Exhibition修改权限
		/// </summary>
		public const string Exhibition_EditExhibition = "Pages.Exhibition.EditExhibition";

		/// <summary>
		/// Exhibition删除权限
		/// </summary>
		public const string Exhibition_DeleteExhibition = "Pages.Exhibition.DeleteExhibition";

        /// <summary>
        /// Exhibition批量删除权限
        /// </summary>
		public const string Exhibition_BatchDeleteExhibitions = "Pages.Exhibition.BatchDeleteExhibitions";



    }
	
}

