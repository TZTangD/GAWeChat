using HC.WeChat.PurchaseRecords;

namespace HC.WeChat.PurchaseRecords.Authorization
{
    /// <summary>
    /// 定义系统的权限名称的字符串常量。
    /// <see cref="PurchaseRecordAppAuthorizationProvider"/>中对权限的定义.
    /// </summary>
    public static class PurchaseRecordAppPermissions
    {
        ////BCC/ BEGIN CUSTOM CODE SECTION
        ////ECC/ END CUSTOM CODE SECTION

        /// <summary>
        /// PurchaseRecord管理权限_自带查询授权
        /// </summary>
        public const string PurchaseRecord = "Pages.PurchaseRecord";

        /// <summary>
        /// PurchaseRecord创建权限
        /// </summary>
        public const string PurchaseRecord_CreatePurchaseRecord = "Pages.PurchaseRecord.CreatePurchaseRecord";
        /// <summary>
        /// PurchaseRecord修改权限
        /// </summary>
        public const string PurchaseRecord_EditPurchaseRecord = "Pages.PurchaseRecord.EditPurchaseRecord";
        /// <summary>
        /// PurchaseRecord删除权限
        /// </summary>
        public const string PurchaseRecord_DeletePurchaseRecord = "Pages.PurchaseRecord.DeletePurchaseRecord";

        /// <summary>
        /// PurchaseRecord批量删除权限
        /// </summary>
        public const string PurchaseRecord_BatchDeletePurchaseRecords = "Pages.PurchaseRecord.BatchDeletePurchaseRecords";

    }

}

