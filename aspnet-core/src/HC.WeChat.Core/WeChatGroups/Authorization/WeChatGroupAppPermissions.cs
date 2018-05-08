using HC.WeChat.WeChatGroups;

namespace HC.WeChat.WeChatGroups.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="WeChatGroupAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class WeChatGroupAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// WeChatGroup管理权限_自带查询授权
        /// </summary>
        public const string WeChatGroup = "Pages.WeChatGroup";

        /// <summary>
        /// WeChatGroup创建权限
        /// </summary>
        public const string WeChatGroup_CreateWeChatGroup = "Pages.WeChatGroup.CreateWeChatGroup";
        /// <summary>
        /// WeChatGroup修改权限
        /// </summary>
        public const string WeChatGroup_EditWeChatGroup = "Pages.WeChatGroup.EditWeChatGroup";
        /// <summary>
        /// WeChatGroup删除权限
        /// </summary>
        public const string WeChatGroup_DeleteWeChatGroup = "Pages.WeChatGroup.DeleteWeChatGroup";

        /// <summary>
        /// WeChatGroup批量删除权限
        /// </summary>
        public const string WeChatGroup_BatchDeleteWeChatGroups = "Pages.WeChatGroup.BatchDeleteWeChatGroups";

    }

}

