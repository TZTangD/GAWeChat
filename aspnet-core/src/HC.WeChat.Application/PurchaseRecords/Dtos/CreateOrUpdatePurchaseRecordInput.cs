using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.PurchaseRecords;

namespace HC.WeChat.PurchaseRecords.Dtos
{
    public class CreateOrUpdatePurchaseRecordInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public PurchaseRecordEditDto PurchaseRecord { get; set; }

}
}