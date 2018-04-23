using HC.WeChat.WechatMessages;

namespace HC.WeChat.WechatMessages.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="WechatMessageAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class WechatMessageAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// WechatMessage管理权限_自带查询授权
        /// </summary>
        public const string WechatMessage = "Pages.WechatMessage";

        /// <summary>
        /// WechatMessage创建权限
        /// </summary>
        public const string WechatMessage_CreateWechatMessage = "Pages.WechatMessage.CreateWechatMessage";
        /// <summary>
        /// WechatMessage修改权限
        /// </summary>
        public const string WechatMessage_EditWechatMessage = "Pages.WechatMessage.EditWechatMessage";
        /// <summary>
        /// WechatMessage删除权限
        /// </summary>
        public const string WechatMessage_DeleteWechatMessage = "Pages.WechatMessage.DeleteWechatMessage";

        /// <summary>
        /// WechatMessage批量删除权限
        /// </summary>
        public const string WechatMessage_BatchDeleteWechatMessages = "Pages.WechatMessage.BatchDeleteWechatMessages";

    }

}

