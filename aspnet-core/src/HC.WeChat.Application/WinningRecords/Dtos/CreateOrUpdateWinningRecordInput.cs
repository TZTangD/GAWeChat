using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.WinningRecords;

namespace HC.WeChat.WinningRecords.Dtos
{
    public class CreateOrUpdateWinningRecordInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public WinningRecordEditDto WinningRecord { get; set; }

}
}