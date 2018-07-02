using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.ExhibitionShops;

namespace HC.WeChat.ExhibitionShops.Dtos
{
    public class CreateOrUpdateExhibitionShopInput
    {
        [Required]
        public ExhibitionShopEditDto ExhibitionShop { get; set; }
     
    }
}