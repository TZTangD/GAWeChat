using HC.WeChat.WechatSubscribes;

namespace HC.WeChat.WechatSubscribes.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="WechatSubscribeAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class WechatSubscribeAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// WechatSubscribe管理权限_自带查询授权
        /// </summary>
        public const string WechatSubscribe = "Pages.WechatSubscribe";

        /// <summary>
        /// WechatSubscribe创建权限
        /// </summary>
        public const string WechatSubscribe_CreateWechatSubscribe = "Pages.WechatSubscribe.CreateWechatSubscribe";
        /// <summary>
        /// WechatSubscribe修改权限
        /// </summary>
        public const string WechatSubscribe_EditWechatSubscribe = "Pages.WechatSubscribe.EditWechatSubscribe";
        /// <summary>
        /// WechatSubscribe删除权限
        /// </summary>
        public const string WechatSubscribe_DeleteWechatSubscribe = "Pages.WechatSubscribe.DeleteWechatSubscribe";

        /// <summary>
        /// WechatSubscribe批量删除权限
        /// </summary>
        public const string WechatSubscribe_BatchDeleteWechatSubscribes = "Pages.WechatSubscribe.BatchDeleteWechatSubscribes";

    }

}

