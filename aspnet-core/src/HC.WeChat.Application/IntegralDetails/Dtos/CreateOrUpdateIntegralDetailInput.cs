using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.IntegralDetails;

namespace HC.WeChat.IntegralDetails.Dtos
{
    public class CreateOrUpdateIntegralDetailInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public IntegralDetailEditDto IntegralDetail { get; set; }

}
}