using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.ShopProducts;

namespace HC.WeChat.ShopProducts.Dtos
{
    public class CreateOrUpdateShopProductInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public ShopProductEditDto ShopProduct { get; set; }

}
}