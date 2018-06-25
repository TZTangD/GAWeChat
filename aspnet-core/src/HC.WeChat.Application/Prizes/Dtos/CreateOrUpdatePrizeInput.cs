using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.Prizes;

namespace HC.WeChat.Prizes.Dtos
{
    public class CreateOrUpdatePrizeInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public PrizeEditDto Prize { get; set; }

}
}