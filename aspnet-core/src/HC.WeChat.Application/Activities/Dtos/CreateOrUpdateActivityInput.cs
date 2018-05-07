using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.Activities;

namespace HC.WeChat.Activities.Dtos
{
    public class CreateOrUpdateActivityInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public ActivityEditDto Activity { get; set; }

}
}