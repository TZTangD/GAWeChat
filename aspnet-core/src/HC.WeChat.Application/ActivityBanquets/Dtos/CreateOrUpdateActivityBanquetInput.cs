using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.ActivityBanquets;

namespace HC.WeChat.ActivityBanquets.Dtos
{
    public class CreateOrUpdateActivityBanquetInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public ActivityBanquetEditDto ActivityBanquet { get; set; }

}
}