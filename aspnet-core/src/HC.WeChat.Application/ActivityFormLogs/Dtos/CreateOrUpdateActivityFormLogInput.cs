using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.ActivityFormLogs;

namespace HC.WeChat.ActivityFormLogs.Dtos
{
    public class CreateOrUpdateActivityFormLogInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public ActivityFormLogEditDto ActivityFormLog { get; set; }

}
}