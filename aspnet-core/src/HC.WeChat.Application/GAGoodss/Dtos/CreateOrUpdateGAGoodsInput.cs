using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HC.WeChat.GAGoodses;

namespace HC.WeChat.GAGoodss.Dtos
{
    public class CreateOrUpdateGAGoodsInput
{
////BCC/ BEGIN CUSTOM CODE SECTION
////ECC/ END CUSTOM CODE SECTION
        [Required]
        public GAGoodsEditDto GAGoods { get; set; }

}
}