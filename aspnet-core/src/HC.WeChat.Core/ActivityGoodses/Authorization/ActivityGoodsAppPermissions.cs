using HC.WeChat.ActivityGoodses;

namespace HC.WeChat.ActivityGoodses.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="ActivityGoodsAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class ActivityGoodsAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// ActivityGoods管理权限_自带查询授权
        /// </summary>
        public const string ActivityGoods = "Pages.ActivityGoods";

        /// <summary>
        /// ActivityGoods创建权限
        /// </summary>
        public const string ActivityGoods_CreateActivityGoods = "Pages.ActivityGoods.CreateActivityGoods";
        /// <summary>
        /// ActivityGoods修改权限
        /// </summary>
        public const string ActivityGoods_EditActivityGoods = "Pages.ActivityGoods.EditActivityGoods";
        /// <summary>
        /// ActivityGoods删除权限
        /// </summary>
        public const string ActivityGoods_DeleteActivityGoods = "Pages.ActivityGoods.DeleteActivityGoods";

        /// <summary>
        /// ActivityGoods批量删除权限
        /// </summary>
        public const string ActivityGoods_BatchDeleteActivityGoodses = "Pages.ActivityGoods.BatchDeleteActivityGoodses";

    }

}

