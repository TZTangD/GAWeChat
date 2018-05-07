using HC.WeChat.WechatAppConfigs;

namespace HC.WeChat.WechatAppConfigs.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="WechatAppConfigAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class WechatAppConfigAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// WechatAppConfig管理权限_自带查询授权
        /// </summary>
        public const string WechatAppConfig = "Pages.WechatAppConfig";

        /// <summary>
        /// WechatAppConfig创建权限
        /// </summary>
        public const string WechatAppConfig_CreateWechatAppConfig = "Pages.WechatAppConfig.CreateWechatAppConfig";
        /// <summary>
        /// WechatAppConfig修改权限
        /// </summary>
        public const string WechatAppConfig_EditWechatAppConfig = "Pages.WechatAppConfig.EditWechatAppConfig";
        /// <summary>
        /// WechatAppConfig删除权限
        /// </summary>
        public const string WechatAppConfig_DeleteWechatAppConfig = "Pages.WechatAppConfig.DeleteWechatAppConfig";

        /// <summary>
        /// WechatAppConfig批量删除权限
        /// </summary>
        public const string WechatAppConfig_BatchDeleteWechatAppConfigs = "Pages.WechatAppConfig.BatchDeleteWechatAppConfigs";

    }

}

