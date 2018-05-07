using HC.WeChat.WeChatUsers;

namespace HC.WeChat.WeChatUsers.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="WeChatUserAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class WeChatUserAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// WeChatUser管理权限_自带查询授权
        /// </summary>
        public const string WeChatUser = "Pages.WeChatUser";

        /// <summary>
        /// WeChatUser创建权限
        /// </summary>
        public const string WeChatUser_CreateWeChatUser = "Pages.WeChatUser.CreateWeChatUser";
        /// <summary>
        /// WeChatUser修改权限
        /// </summary>
        public const string WeChatUser_EditWeChatUser = "Pages.WeChatUser.EditWeChatUser";
        /// <summary>
        /// WeChatUser删除权限
        /// </summary>
        public const string WeChatUser_DeleteWeChatUser = "Pages.WeChatUser.DeleteWeChatUser";

        /// <summary>
        /// WeChatUser批量删除权限
        /// </summary>
        public const string WeChatUser_BatchDeleteWeChatUsers = "Pages.WeChatUser.BatchDeleteWeChatUsers";

    }

}

