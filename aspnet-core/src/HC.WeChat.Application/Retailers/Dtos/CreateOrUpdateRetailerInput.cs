using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.Retailers;

namespace HC.WeChat.Retailers.Dtos
{
    public class CreateOrUpdateRetailerInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public RetailerEditDto Retailer { get; set; }

}
}