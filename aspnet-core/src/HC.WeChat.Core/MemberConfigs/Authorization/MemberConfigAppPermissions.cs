using HC.WeChat.MemberConfigs;

namespace HC.WeChat.MemberConfigs.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="MemberConfigAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class MemberConfigAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// MemberConfig管理权限_自带查询授权
        /// </summary>
        public const string MemberConfig = "Pages.MemberConfig";

        /// <summary>
        /// MemberConfig创建权限
        /// </summary>
        public const string MemberConfig_CreateMemberConfig = "Pages.MemberConfig.CreateMemberConfig";
        /// <summary>
        /// MemberConfig修改权限
        /// </summary>
        public const string MemberConfig_EditMemberConfig = "Pages.MemberConfig.EditMemberConfig";
        /// <summary>
        /// MemberConfig删除权限
        /// </summary>
        public const string MemberConfig_DeleteMemberConfig = "Pages.MemberConfig.DeleteMemberConfig";

        /// <summary>
        /// MemberConfig批量删除权限
        /// </summary>
        public const string MemberConfig_BatchDeleteMemberConfigs = "Pages.MemberConfig.BatchDeleteMemberConfigs";

    }

}

