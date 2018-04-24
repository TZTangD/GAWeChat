using HC.WeChat.ShopEvaluations;

namespace HC.WeChat.ShopEvaluations.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="ShopEvaluationAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class ShopEvaluationAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// ShopEvaluation管理权限_自带查询授权
        /// </summary>
        public const string ShopEvaluation = "Pages.ShopEvaluation";

        /// <summary>
        /// ShopEvaluation创建权限
        /// </summary>
        public const string ShopEvaluation_CreateShopEvaluation = "Pages.ShopEvaluation.CreateShopEvaluation";
        /// <summary>
        /// ShopEvaluation修改权限
        /// </summary>
        public const string ShopEvaluation_EditShopEvaluation = "Pages.ShopEvaluation.EditShopEvaluation";
        /// <summary>
        /// ShopEvaluation删除权限
        /// </summary>
        public const string ShopEvaluation_DeleteShopEvaluation = "Pages.ShopEvaluation.DeleteShopEvaluation";

        /// <summary>
        /// ShopEvaluation批量删除权限
        /// </summary>
        public const string ShopEvaluation_BatchDeleteShopEvaluations = "Pages.ShopEvaluation.BatchDeleteShopEvaluations";

    }

}

