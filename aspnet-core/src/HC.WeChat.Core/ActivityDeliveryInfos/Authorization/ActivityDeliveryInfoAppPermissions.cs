using HC.WeChat.ActivityDeliveryInfos;

namespace HC.WeChat.ActivityDeliveryInfos.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="ActivityDeliveryInfoAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class ActivityDeliveryInfoAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// ActivityDeliveryInfo管理权限_自带查询授权
        /// </summary>
        public const string ActivityDeliveryInfo = "Pages.ActivityDeliveryInfo";

        /// <summary>
        /// ActivityDeliveryInfo创建权限
        /// </summary>
        public const string ActivityDeliveryInfo_CreateActivityDeliveryInfo = "Pages.ActivityDeliveryInfo.CreateActivityDeliveryInfo";
        /// <summary>
        /// ActivityDeliveryInfo修改权限
        /// </summary>
        public const string ActivityDeliveryInfo_EditActivityDeliveryInfo = "Pages.ActivityDeliveryInfo.EditActivityDeliveryInfo";
        /// <summary>
        /// ActivityDeliveryInfo删除权限
        /// </summary>
        public const string ActivityDeliveryInfo_DeleteActivityDeliveryInfo = "Pages.ActivityDeliveryInfo.DeleteActivityDeliveryInfo";

        /// <summary>
        /// ActivityDeliveryInfo批量删除权限
        /// </summary>
        public const string ActivityDeliveryInfo_BatchDeleteActivityDeliveryInfos = "Pages.ActivityDeliveryInfo.BatchDeleteActivityDeliveryInfos";

    }

}

