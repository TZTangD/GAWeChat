using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.Shops;

namespace HC.WeChat.Shops.Dtos
{
    public class CreateOrUpdateShopInput
    {
        [Required]
        public ShopEditDto Shop { get; set; }

        public int? TenantId { get; set; }

        public string OpenId { get; set; }

    }
}