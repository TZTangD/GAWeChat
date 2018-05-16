using HC.WeChat.GAGoodses;

namespace HC.WeChat.GAGoodses.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="GAGoodsAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class GAGoodsAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// GAGoods管理权限_自带查询授权
        /// </summary>
        public const string GAGoods = "Pages.GAGoods";

        /// <summary>
        /// GAGoods创建权限
        /// </summary>
        public const string GAGoods_CreateGAGoods = "Pages.GAGoods.CreateGAGoods";
        /// <summary>
        /// GAGoods修改权限
        /// </summary>
        public const string GAGoods_EditGAGoods = "Pages.GAGoods.EditGAGoods";
        /// <summary>
        /// GAGoods删除权限
        /// </summary>
        public const string GAGoods_DeleteGAGoods = "Pages.GAGoods.DeleteGAGoods";

        /// <summary>
        /// GAGoods批量删除权限
        /// </summary>
        public const string GAGoods_BatchDeleteGAGoodses = "Pages.GAGoods.BatchDeleteGAGoodses";

    }

}

