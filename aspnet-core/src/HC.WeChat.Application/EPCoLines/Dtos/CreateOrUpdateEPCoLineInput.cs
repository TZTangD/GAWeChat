using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.EPCoLines;

namespace HC.WeChat.EPCoLines.Dtos
{
    public class CreateOrUpdateEPCoLineInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public EPCoLineEditDto EPCoLine { get; set; }

}
}