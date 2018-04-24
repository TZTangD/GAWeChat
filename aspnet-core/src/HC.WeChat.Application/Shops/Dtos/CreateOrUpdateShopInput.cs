using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.Shops;

namespace HC.WeChat.Shops.Dtos
{
    public class CreateOrUpdateShopInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public ShopEditDto Shop { get; set; }

}
}